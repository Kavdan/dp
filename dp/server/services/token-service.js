import jwt from "jsonwebtoken";
import tokenModel from "../models/token-model.js";
import dao from "../database/dao.js";

export default class {
    static generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15s'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30s'})
        return {
            accessToken,
            refreshToken
        }
    }

    static validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    static validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    static async saveRefreshToken(userId, refreshToken) {
        try{
            let token = await tokenModel.getRefreshTokenByUserId(userId);
    
            if(token) {
                await tokenModel.setRefreshToken(userId, refreshToken);
            } else {
                await tokenModel.addRefreshToken(userId, refreshToken);
                token = await tokenModel.setRefreshToken(userId, refreshToken);
            }

            return token;
        }catch(error) {
            throw error;
        }
    }

    static async getRefreshToken(refreshToken) {
        try {
            const token = await tokenModel.getRefreshToken(refreshToken);      
            return token;
        } catch(error) {
            throw error;
        }
    }

    static async removeRefreshToken(refreshToken){
        try{
            const result = await tokenModel.deleteRefreshToken(refreshToken);
            return result;
        } catch(error) {
            throw error;
        }
    }
}