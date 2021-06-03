import { Authenticate } from '../../models/user';

export class Login {
    static readonly type = '[Account] Login';
    constructor(public payload: Authenticate) {}
}

export class Logout {
    static readonly type = '[Account] Logout';
}
    