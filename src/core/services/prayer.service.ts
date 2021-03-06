import axios,{AxiosRequestConfig,CancelTokenSource} from "axios"
import {IResponse} from "core/models/Response"
import {IPrayer,IPrayerRequest} from "core/models/Prayer"
import { ITestimony,TestimonyType,TestimonyStatusType } from "core/models/Testimony"


const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Prayer`
const config:AxiosRequestConfig = {headers:{"Content-Type":"application/json-patch+json"}}

export const addPrayer = async (newPrayer:IPrayer):Promise<IResponse<IPrayer>> => {
    try{
        const url = `${baseUrl}/AddPrayer`
        const response = await axios.post(url,newPrayer,config)
        return response.data
    }catch(err){
        throw err
    }
}
export const getPrayer = async (denominationId:number,cancelToken:CancelTokenSource):Promise<IResponse<IPrayer[]>> => {
    try{
        const url = `${baseUrl}/GetPrayer`
        const response = await axios.get(url,{
            cancelToken:cancelToken.token
        })
        return response.data
    }catch(err){
        throw err
    }
}
export const getDailyReading = async (dateString:string,cancelToken:CancelTokenSource):Promise<IResponse<any>> => {
    try{
        const url = `${baseUrl}/GetDailyReading/${dateString}`
        const response = await axios.get(url,{
            cancelToken:cancelToken.token
        })
        return response.data
    }catch(err){
        throw err
    }
}
export const getPreviousDailyReading = async (dateString:Date):Promise<IResponse<IPrayer[]>> => {
    try{
        const url = `${baseUrl}/GetPreviousDailyReading`
        const response = await axios.get(url)
        return response.data
    }catch(err){
        throw err
    }
}

// Prayer Request
export const getPrayerRequest = async (churchId:string,cancelToken:CancelTokenSource):Promise<IResponse<IPrayerRequest[]>> => {
    try{
        const url = `${baseUrl}/GetPrayerRequest/${churchId}`
        const response = await axios.get(url,{
            cancelToken:cancelToken.token
        })
        return response.data
    }catch(err){
        throw err
    }
}
export const addPrayerRequest = async (arg:IPrayer):Promise<IResponse<IPrayer>> => {
    const url = `${baseUrl}/AddPrayerRequest`
    try{
        const response = await axios.post(url,arg,config)
        return response.data
    }catch(err){
        throw err
    }
}
export const updatePrayerRequest = async (arg:IPrayer):Promise<IResponse<IPrayer>> => {
    const url = `${baseUrl}/updatePrayerRequest`
    try{
        const response = await axios.put(url,arg,config)
        return response.data
    }catch(err){
        throw err
    }
}
export const deletePrayerRequest = async (prayerId:number):Promise<IResponse<IPrayer>> => {
    const url = `${baseUrl}/deletePrayerRequest?prayerrequestId=${prayerId}`
    try{
        const response = await axios.delete(url,config)
        return response.data
    }catch(err){
        throw err
    }
}
export const prayPrayerRequest = async (arg:string):Promise<IResponse<null>> => {
    const url = `${baseUrl}/PrayPrayerRequest`
    try{
        const response = await axios.get(url)
        return response.data
    }catch(err){
        throw err
    }
} 

// Testimony 
export const addTestimony = async (arg:ITestimony):Promise<IResponse<ITestimony>> => {
    const url = `${baseUrl}/AddTestimony`
    try{
        const response = await axios.post(url,arg,config)
        return response.data
    }catch(err){
        throw err
    }
}

interface IGetTestimony {
    churchId:number;
    testimonyType: TestimonyType
}

export const getTestimony = async (arg:IGetTestimony,cancelToken:CancelTokenSource):Promise<IResponse<ITestimony[]>> => {
    const url = `${baseUrl}/GetTestimony/${arg.churchId}`
    try{
        const response = await axios.get(url,{
            cancelToken:cancelToken.token
        })
        return response.data
    }catch(err){
        throw err
    }
}
export const updateTestimony = async (arg:IPrayerRequest):Promise<IResponse<ITestimony>> => {
    const url = `${baseUrl}/updatePrayerRequest`
    try{
        const response = await axios.put(url,arg,config)
        return response.data
    }catch(err){
        throw err
    }
}

export const deleteTestimony = async (testimonyId:number):Promise<IResponse<string>> => {
    const url = `${baseUrl}/DeletTestimony?testimonyId=${testimonyId}`
    try{
        const response = await axios.delete(url)
        return response.data
    }catch(err){
        throw err
    }
}

interface IChangeTestimonyStatus {
    testimonyId:number;
    testimonyStatus:TestimonyStatusType
}
export const ChangeTestimonyStatus = async (arg:IChangeTestimonyStatus):Promise<IResponse<null>> => {
    const url = `${baseUrl}/ChangeTestimonyStatus`
    try{
        const response = await axios.put(url)
        return response.data
    }catch(err){
        throw err
    }
}

interface ICommentOnTestimony {
    testimonyId:number;
    comment:string;
    personId:string
}

export const CommentOnTestimony = async (arg:ICommentOnTestimony):Promise<IResponse<null>> => {
    const url = `${baseUrl}/CommentOnTestimony`
    try{
        const response = await axios.post(url)
        return response.data
    }catch(err){
        throw err
    }
}
