import axios from "axios"
import {IResponse} from "core/models/Response"
import {IGroup,ICreateGroupMember,IGroupMember} from "core/models/Group"

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Church`

export const createGroup = async (newGroup:IGroup):Promise<IResponse<IGroup>> => {
    try{
        const url = `${baseUrl}/createGroup`
        const response = await axios.post(url,newGroup,{
            headers:{
                accept:"application/json",
                "Content-Type":"application/json-patch+json",
                "Access-Control-Allow-Origin":"*"
            }
        })
        return response.data
    }catch(err){
        throw err
    }
}
export const getGroupByChurch = async (churchId:string):Promise<IResponse<IGroup[]>> => {
    try{
        const url = `${baseUrl}/getSocietyByChurch/${churchId}`
        const response = await axios.get(url)
        return response.data
    }catch(err){
        throw err
    }
}
export const getGroup = async (groupId:string):Promise<IResponse<IGroup[]>> => {
    try{
        const url = `${baseUrl}/createSociety`
        const response = await axios.post(url)
        return response.data
    }catch(err){
        throw err
    }
}
export const createGroupMember = async (newGroupMember:ICreateGroupMember):Promise<IResponse<IGroupMember[]>> => {
    try{
        const url = `${baseUrl}/createSocietyMember`
        const response = await axios.post(url,newGroupMember)
        return response.data
    }catch(err){
        throw err
    }
}
export const getGroupMember = async (groupId:number): Promise<IResponse<IGroupMember[]>> => {
    try{
        const url = `${baseUrl}/GetSocietyMember/${groupId}`
        const response = await axios.get(url)
        return response.data
    }catch(err){
        throw err
    }
}
export const updateGroup = async (updatedGroup:IGroup):Promise<IResponse<IGroup>> => {
    try{
        const url = `${baseUrl}/updateSociety/${updatedGroup.groupID}`
        // const config:AxiosRequestConfig = {headers:{"Content-Type":"application/json-patch+json"}}
        const response = await axios.put(url,updatedGroup)
        return response.data
    }catch(err){
        throw err
    }
}
export const deleteGroup = async (deleteGroupId:number):Promise<IResponse<IGroup>> => {
    try{
        
        const base = `${baseUrl}/deleteGroup/${deleteGroupId}`
        const response = await axios.delete(base)
        return response.data
    }catch(err){
        throw err
    }
}