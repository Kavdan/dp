import dao from "../database/dao.js";
import { v4 as uuidv4 } from "uuid";
import tokenQueries from "../queries/token-queries.js";

export default class {
    static async addRefreshToken(userId, refreshToken) {
        const id = uuidv4();
        const result = await dao.run(tokenQueries.ADD_REFRESH_TOKEN_QUERY,
                                     [id, userId, refreshToken]);
        return id;
    }

    static async getRefreshTokenByUserId(userId){
        const result = await dao.get(tokenQueries.GET_REFRESH_TOKEN_BY_USER_ID_QUERY, [userId]);
        return result;
    }

    static async getRefreshToken(refreshToken){
        const result = await dao.get(tokenQueries.GET_REFRESH_TOKEN_QUERY, [refreshToken]);
        return result;
    }

    static async setRefreshToken(userId, refreshToken) {
        const result = await dao.run(tokenQueries.SET_REFRESH_TOKEN_QUERY, [refreshToken, userId]);
        return result;
    }

    static async deleteRefreshToken(refreshToken) {
        const result = await dao.run(tokenQueries.DELETE_REFRESH_TOKEN_QUERY, [refreshToken]);
        return result;
    }
}