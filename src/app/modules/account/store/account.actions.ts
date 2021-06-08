import { Authenticate, RegisterUser } from '../shared/user';

export class Registration {
    static readonly type = '[Account] Regisration';
    constructor(public payload: RegisterUser) {}
}

export class Login {
    static readonly type = '[Account] Login';
    constructor(public payload: Authenticate) {}
}
export class TokenRefresh {
    static readonly type = '[Account] TokensRefresh';
}
export class Logout {
    static readonly type = '[Account] Logout';
}
 
export class GetUsersData {
    static readonly type = '[Account] Get User';
}