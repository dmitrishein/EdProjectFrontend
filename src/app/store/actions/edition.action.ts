import { EditionPageParameters } from "src/app/shared/models/edition";

export class GetEditionList {
    static readonly type = '[Edition] Get Edition List';
}

export class GetEditionPage {
    static readonly type = '[Edition] Get Edition Page';
}
export class SetPageParams {
    static readonly type = '[Edition] Set Page Params';
    constructor (public params : EditionPageParameters){};
}