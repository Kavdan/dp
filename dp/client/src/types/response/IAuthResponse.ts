import { IUserDto } from "../IUserDto";

export interface IAuthResponse {
    accessToken: string,
    refreshToken: string, 
    user: IUserDto
}