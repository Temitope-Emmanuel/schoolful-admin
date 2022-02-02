import axios from "."
import {IResponse} from "core/models/Response"
import {ICity,IState} from "core/models/Location"
import {ILeaderPosition} from "core/models/Group"
import {IBank} from "core/models/BankAccount"

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Utility`

export const getState = async ():Promise<IResponse<IState[]>> => {
    try{
        const url = `${baseUrl}/getStates`
        const response = await axios.get(url)
        console.log('this is the response.data', response.data)
        return response.data
    }catch(err){
        console.log('theres been an err', err)
        throw err
    }
}
export const getGroupPosition = async ():Promise<IResponse<ILeaderPosition[]>> => {
    try{
        const url = `${baseUrl}/getallLeadersPosition`
        const response = await axios.get(url)
        return response.data
    }catch(err){
        throw err
    }
}

export const getCity = async (stateId:string):Promise<IResponse<string[]>> => {
    try{
        const url = `${baseUrl}/city/${stateId}`
        const response = await axios.get(url)
        return response.data
    }catch(err){
        throw err
    }
}
export const getBanks = async ():Promise<IResponse<IBank[]>> => {
    try{
        const url = `${baseUrl}/GetBanks`
        const response = await axios.get(url)
        return response.data
    }catch(err){
        throw err
    }
}