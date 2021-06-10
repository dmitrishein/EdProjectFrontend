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

export interface Author {
    id:number;
    name:string;
}