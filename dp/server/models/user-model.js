import dao from "../database/dao.js";
import userQueries from "../queries/user-queries.js";
import { v4 as uuidv4 } from "uuid";

export default class {
    static async addUser(name, email, password) {
        const id = uuidv4();
        const result = await dao.run(userQueries.ADD_USER_QUERY, 
                                     [id, name, email, password]);                    
        return id;
    }

    static async addActivationLink(userId, activationLink) {
        const id = uuidv4();
        const result = await dao.run(userQueries.ADD_ACTIVATION_LINK,
                                     [id, userId, activationLink]);
        return id;
    }

    static async getUserByActivationLink(activationLink){
        const user = await dao.get(userQueries.GET_USER_BY_ACTIVATION_LINK_QUERY, [activationLink]);
        return user;
    }

    static async getUserByEmail(email){
        const user = await dao.get(userQueries.GET_USER_BY_EMAIL, [email]);
        return user;
    }

    static async getUserById(userId) {
        const user = await dao.get(userQueries.GET_USER_BY_ID_QUERY, [userId]);
        return user;
    }

    static async setActivatedStatus(userId){
        const result = await dao.run(userQueries.SET_ACTIVATED_STATUS, [userId]);
        return result;
    }

    static async getAllUsers(){
        const result = await dao.all(userQueries.GET_ALL_USERS);
        return result;
    }
}
