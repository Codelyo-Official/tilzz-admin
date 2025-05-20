export type DecodedToken = {
    username: string;
    id:number;
    exp?: number;
    role?:string;
    // [key: string]: any;
};
