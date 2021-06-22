export interface Edition {
    id:number;
    title :string;
    description :string;
    price : number;
    currency : string;
    status : string;
    type : string; 
    authors : Author[];
}

export interface EditionsType{
    isBook : number,
    isMagazine : number,
    isNewspaper : number
}

export interface EditionPageParameters{
    ElementsPerPage : number;
    CurrentPageNumber : number;
    SearchString : string;
    MaxPrice : number;
    MinPrice : number;
    EditionTypes : number[];
    SortType : number;
    IsReversed : boolean;
}

export interface EditionPageResponseModel{
    MaxPrice : number,
    MinPrice : number,
    TotalItemsAmount : number;
    CurrentPage : number;
    Editions : Edition[];
}

export interface Author {
    id:number;
    name:string;
}