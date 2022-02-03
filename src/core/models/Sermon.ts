
export interface ISermon {
    sermonID?:string;
    title:string;
    author:string;
    featureImage?:string;
    featureDateFrom:Date;
    featureDateTo:Date;
    sermonContent:string;
    churchId:number;
    mediaType: 'video' | 'audio' | 'text';
    mediaUrl?:string;
}