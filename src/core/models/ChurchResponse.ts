export interface IChurchResponse {
    churchID?:number;
    name:string;
    address:string;
    longitude?:string;
    latitude?:string;
    churchLogo?:string;
    churchMotto?:string
    denominationId:number;
    denomination?:string;
    dioceseId?:number;
    deanaryId?:number;
    provinceId?:number;
    regionId?:number;
    state:string;
    city:string;
}