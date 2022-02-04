export type TestimonyStatusType = "Approved" | "Pending"  | "Deleted"
export type TestimonyType = "General" | "Thanksgiven"

export interface ITestimony {
    testimonyID?:number;
    testimonyTitle:string;
    testimonyDetail:string
    personID:string;
    churchID:number;
    dateEntered:Date;
    timeLapsed?:string;
}