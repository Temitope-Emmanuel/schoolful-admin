export interface IAdvert {
    advertID?:number;
    title:string
    dateFrom:string | Date; 
    dateTo:string | Date;
    advertUrl?:string
    churchID:number;
}

export interface IAdvertSetting {
    discount: number;
    duration:"Daily" | "Weekly" | "Monthly" | "Quarterly" | "Annually";
    id: number;
    price: number;
    status: "Active" | "Pending" | "";
    title: string;
    howLong?:number;
    perDay?:number
}