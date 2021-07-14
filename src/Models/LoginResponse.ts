import { User } from "./User";

export interface LoginResponse{
    user : User,
    success: boolean,
    errorMessage: string[]
};