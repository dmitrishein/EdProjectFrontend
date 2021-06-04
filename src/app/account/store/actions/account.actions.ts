import { Authenticate, TokenPair, User } from '../../models/user';

export class Login {
    static readonly type = '[Account] Login';
    constructor(public payload: Authenticate) {}
}

export class Logout {
    static readonly type = '[Account] Logout';
}
 
export class GetUsersData {
    static readonly type = '[Account] Get User';
}