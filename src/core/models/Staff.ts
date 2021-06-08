export interface IStaff {
    staffID?:string;
    churchId:number;
    phoneNumber?:number;
    status?:"Active" | "Pending" | "Suspended" | "Deleted" | string;
    lastLogin?:Date | string;
    fullname:string;
    email:string;
    role:string | null;
    imageUrl?:null;
    claim:string | string[]
}