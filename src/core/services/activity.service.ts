import axios,{AxiosRequestConfig,CancelTokenSource} from "axios"
import {IActivity} from "core/models/Activity"
import {IResponse} from "core/models/Response"
import {IEvent} from "core/models/Event"

const baseUrl = process.env.REACT_APP_SERVER_URL

export const createActivity = async (arg:IActivity<string>):Promise<IResponse<IActivity<string>>> => {
    const url = `${baseUrl}/Activity/CreateActivity`
    try{
        console.log('this is the arg', {arg})
        const response = await axios.post(url,arg)
        return response.data
    }catch(err){
        throw err
    }
}

export const updateActivity = async (arg:Partial<IActivity<string>>):Promise<IResponse<IActivity<string>>> => {
    const url = `${baseUrl}/Activity/UpdateActivity`
    try{
        const config:AxiosRequestConfig = {headers:{"Content-Type":"application/json-patch+json"}}
        const response = await axios.put(url,arg)
        return response.data
    }catch(err){
        throw err
    }
}

export const getChurchActivity = async (churchId:string,cancelToken:CancelTokenSource):Promise<IResponse<IActivity<string>[]>> => {
    const url = `${baseUrl}/Activity/GetChurchActivityByChurchID/${churchId}`
    try{
        const config:AxiosRequestConfig = {headers:{Accept:"text/plain"},cancelToken:cancelToken.token}
        const response = await axios.get(url)
        return response.data
    }catch(err){
        throw err
    }
}

export const createEvent = async (arg:IEvent):Promise<IResponse<IEvent>> => {
    try{
        const url = `${baseUrl}/Activity/CreateEvents`
        const response = await axios.post(url,arg)
        return response.data
    }catch(err){
        throw err
    }
}

export const updateEvent = async (arg:Partial<IEvent>):Promise<IResponse<IEvent>> => {
    const url = `${baseUrl}/Activity/UpdateEvents`
    try{
        const config:AxiosRequestConfig = {headers:{"Content-Type":"application/json-patch+json"}}
        const response = await axios.put(url,arg)
        return response.data
    }catch(err){
        throw err
    }
}

export const getChurchEvent = async (churchId:string,cancelToken:CancelTokenSource):Promise<IResponse<IEvent[]>> => {
    const url = `${baseUrl}/Event/GetChurchEventByChurchID=${churchId}`
    try{
        const config:AxiosRequestConfig = {headers:{Accept:"text/plain"},cancelToken:cancelToken.token}
        const response = await axios.get(url)
        return response.data
    }catch(err){
        throw err
    }
}
export const getEventByID = async (eventId:string,cancelToken:CancelTokenSource):Promise<IResponse<IEvent>> => {
    const url = `${baseUrl}/Activity/GetEventById?id=${eventId}`
    try{
        const config:AxiosRequestConfig = {headers:{Accept:"text/plain"},cancelToken:cancelToken.token}
        const response = await axios.get(url)
        return response.data
    }catch(err){
        throw err
    }
}