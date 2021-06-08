export interface RegisterUser {
    username: string;
    firstName: string; 
    lastName: string, 
    email: string,  
    password: string,  
    confirmPassword: string,
}
export interface Authenticate {
    email : string;
    password : string;
}
export interface ChangeToken {
    email: string;
    refreshToken: string;
}

export interface TokenPair{
    accessToken : string;
    refreshToken : string;
}

export interface User{
    id : number;
    fullName : string;
    email : string;
    IsEmailConfirmed : boolean;
}