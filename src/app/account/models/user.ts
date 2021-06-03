export interface Authenticate {
    email : string;
    password : string;
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