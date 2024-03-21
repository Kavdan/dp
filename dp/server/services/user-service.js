import dao from "../database/dao.js";
import userModel from "../models/user-model.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import tokenService from "./token-service.js";
import emailService from "./email-service.js";
import tokenModel from "../models/token-model.js";
import userDto from "../dto/user-dto.js";
import ApiError from "../exceptions/api-error.js";

export default class {
    static async signUp(name, email, password) {
        try {
            await dao.beginTransaction();

            const user = await userModel.getUserByEmail(email);

            if(user) {
                throw ApiError.BadRequest(`Пользователь с email - ${email} уже существует`);
            }

            const hash_password = await bcrypt.hash(password, 3);
            const activationLink = uuidv4();
            
            const userId = await userModel.addUser(name, email, hash_password);
            const _userDto = new userDto({email, userId, isActivated: false}); 
            const tokens = tokenService.generateTokens({..._userDto});

            await userModel.addActivationLink(userId, activationLink);
            await tokenModel.addRefreshToken(userId, tokens.refreshToken);
            await emailService.sendActivationMail(email, 
                `${process.env.API_URL}/api/activate/${activationLink}`);

            await dao.commitTransaction();

            return { user: _userDto, ...tokens };
        } catch (error) {
            await dao.rollbackTransaction();
            throw error;
        }
    }

    static async activate(activationLink) {
        try{
            await dao.beginTransaction();
            let msg;
            const user = await userModel.getUserByActivationLink(activationLink);

            if (!user) {
                throw ApiError.BadRequest('Неккоректная ссылка активации')
            }

            if(user && !user.isActivated){
                await userModel.setActivatedStatus(user.userId);
                msg = "Пользователь успешно активирован!"
            } else {
                msg = "Неправильный url!";
            }

            await dao.commitTransaction();

            return msg;
        } catch(error) {
            await dao.rollbackTransaction();
            throw error;
        }
    }

    static async signIn(email, password) {
      try {
        dao.beginTransaction();

        const user = await userModel.getUserByEmail(email);

        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }

        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            throw ApiError.BadRequest('Неверный пароль');
        }

        const _userDto = new userDto(user);
        const tokens = tokenService.generateTokens({..._userDto});

        await tokenService.saveRefreshToken(user.userId, tokens.refreshToken);

        dao.commitTransaction();
        
        return {...tokens, userDto: _userDto};
      } catch (error) {
        dao.rollbackTransaction();
        throw error;
      }
    }

    static async signOut(refreshToken) {
        try{
            dao.beginTransaction();

            const token = await tokenService.removeRefreshToken(refreshToken);

            dao.commitTransaction();

            return {msg: "logout success"};
        }catch(error) {
            dao.rollbackTransaction();
            throw error;
        }
    }

    static async refresh(refreshToken) {
       try {
        dao.beginTransaction();

        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userInfo = tokenService.validateRefreshToken(refreshToken);
        const token = await tokenService.getRefreshToken(refreshToken);

        if (!userInfo || !token) {
            throw ApiError.UnauthorizedError();
        }

        const user = await userModel.getUserById(userInfo.userId);
        const _userDto = new userDto(user);
        const tokens = tokenService.generateTokens({..._userDto});

        await tokenService.saveRefreshToken(user.userId, tokens.refreshToken);
        
        dao.commitTransaction();

        return {...tokens, user: _userDto}

       } catch (error) {
        dao.rollbackTransaction();
        throw error;
       }
    }

}