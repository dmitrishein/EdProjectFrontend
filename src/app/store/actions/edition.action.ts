import { EditionPageParameters } from "src/app/shared/models/edition";

export class GetEditionList {
    static readonly type = '[Edition] Get Edition List';
}

export class GetEditionPage {
    static readonly type = '[Edition] Get Edition Page';
    constructor (public params : EditionPageParameters){};
}

export class GetDefaultEditionPage {
    static readonly type = '[Edition] Get Default Edition Page';
}

export class SetPageParameters {
    static readonly type = '[Edition] Set Page Params'
    constructor (public params : EditionPageParameters){};
}
