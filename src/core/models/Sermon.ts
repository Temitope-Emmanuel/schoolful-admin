
export interface ISermon {
    sermonID?:string;
    title:string;
    author:string;
    featureImage?:string;
    featureDateFrom:Date;
    featureDateTo:Date;
    sermonContent:string;
    churchID:number;
    mediaType: 'video' | 'audio' | 'text';
    mediaUrl?:string;
}