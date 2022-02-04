// import {IChurch} from "./Church"

export interface IAnnouncement {
    announcementID?:string;
    title:string;
    description:string;
    churchID:number;
    createdAt:Date;
}