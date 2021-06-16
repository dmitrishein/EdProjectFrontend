import { Authenticate, RegisterUser, UpdateUserModel } from '../../shared/models/user';

export class Registration {
    static readonly type = '[Account] Regisration';
    constructor(public payload: RegisterUser) {}
}
export class UpdateUserData {
    static readonly type = '[Account] Update User'
    constructor(public payload : UpdateUserModel) {}
}
export class Login {
    static readonly type = '[Account] Login';
    constructor(public payload: Authenticate) {}
}
export class TokenRefresh {
    static readonly type = '[Account] Token Refresh';
}
export class Logout {
    static readonly type = '[Account] Logout';
}
export class GetUsersData {
    static readonly type = '[Account] Get User Data';    
    constructor(public email:string){}
}
export class ConfirmEmail {
    static readonly type = '[Account] Confirm Email';
    constructor(public token:string,public email:string){}
}
export class ResetPassword {
    static readonly type = '[Account] Reset Password';
    constructor(public email:string){}
}
export class ChangePassword {
    static readonly type = '[Account] Change Password';
    constructor(public email:string, public token:string, public newPassword : string){}
}