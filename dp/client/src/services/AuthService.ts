import { AxiosResponse } from "axios";
import { IAuthResponse } from "../types/response/IAuthResponse";
import $api from "../http";

export default class AuthService {
    static async signIn({email, password} : {email:string, password:string})
        : Promise<AxiosResponse<IAuthResponse>> {
        return $api.post("/signin", { email, password });
    }

    static async signUp({name, email, password} : {name: string, email: string, password: string})
        : Promise<AxiosResponse<IAuthResponse>> {
        return $api.post("/signup", { name, email, password });
    }

    static async signOut() : Promise<void> {
        return $api.post("/signout");
    }
}