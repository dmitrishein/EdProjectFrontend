export interface RegisterUser {
    username: string;
    firstName: string; 
    lastName: string, 
    email: string,  
    password: string,  
    confirmPassword: string,
}
export interface ChangePassword {
    email : string;
    token : string;
    newPassword :string;
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
    fullname : string;
    email : string;
    IsEmailConfirmed : boolean;
    username : string;
}
export interface UpdateUserModel{
    jwt : string;
    fullname : string;
    email : string;
    username : string;
}