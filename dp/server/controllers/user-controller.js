import userService from "../services/user-service.js";
import { validationResult } from "express-validator";

export default class {
    static async signUp(req, res, next){    
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            
            const {name, email, password} = req.body;  
            const result = await userService.signUp(name, email, password);
            res.send("User added to db");
        } catch (error) {
            next(error);
        }

    }

    static async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error)
        }
    }

    static async signIn(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await userService.signIn(email, password);
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    static async signOut(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.signOut(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    static async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    static async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}