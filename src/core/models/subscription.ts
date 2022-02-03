export interface ISubscription {
    subscriptionPlanID?:number;
    name:string;
    category:string;
    cost:number;
    createdAt:Date;
    updatedAt:Date;
    status:'Active' | 'Deactivated';
}
export interface SubscriptionByChurch {
    churchId:number;
    duration:number;
    expirationDate:Date;
    isActive:boolean;
    paymentId:null | string;
    startDate:Date;
    subscriptionID:number;
    subscriptionPlanID:number;
    timeRemaining?:number;
    subscriptionPlan?:ISubscription
}