import { Authenticate, RegisterUser, User } from '../../shared/models/user';

export class Registration {
    static readonly type = '[Account] Regisration';
    constructor(public payload: RegisterUser) {}
}
export class UpdateUserData {
    static readonly type = '[Account] Update User'
    constructor(public payload : User) {}
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
    static readonly type = '[Account] Get User';
}