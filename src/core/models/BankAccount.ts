export interface IBank {
    bankID:string;
    bankName:string;
    bankCode:number
}
export interface IChurchBankDetail {
    churchBankID?:number;
    bankCode:string;
    name:string;
    churchId:string;
    accountNumber:string;
    defaultAccount:boolean;
    bankName?:string
}
