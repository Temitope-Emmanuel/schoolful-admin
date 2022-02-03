import MockAdapter from "axios-mock-adapter/types"
import { ChurchStatus } from "core/enums/Church"
import denomination from '../data/denomination.json'
import churchBankAccount from '../data/churchAccount.json'

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Church`

export const churchMock = (mock: MockAdapter) => {

  // Get Denomination
  mock.onGet(`${baseUrl}/getDenomination`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:denomination
  })

  // Create church
  mock.onPost(`${baseUrl}/createChurch`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:[]
  })

  mock.onPost(`${baseUrl}/createChurchBankDetail`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:churchBankAccount[3]
  })

  // Get Church
  const getChurchUrl = `${baseUrl}/getchurchbyId`;
  const url = new RegExp(`${getChurchUrl}/*`);

  mock.onGet(url).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:{
      churchBarner:'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
      status:ChurchStatus.ACTIVE,
      email:'church@gmail.com',
      country:'Nigeria',
      priestName:'Priest Name',
    }
  })

  // Get Church
  const getChurchAccountUrl = `${baseUrl}/getchurchBankAccountByChurch`;
  mock.onGet(new RegExp(`${getChurchAccountUrl}/*`)).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:churchBankAccount
  })
}

// export const activateChurch = async (churchId:number):Promise<IResponse<IChurchResponse>> => {
//     try{
//         const urlBase = new URL(`${baseUrl}/activateChurch`)
//         const response = await axios.put(String(urlBase),{})
//         return response.data
//     }catch(err){
//         throw err
//     }
// }
// export const verifyChurch = async (arg:IChurchResponse):Promise<IResponse<IChurchResponse>> => {
//     try{
//         const url = `${baseUrl}/verifyChurch`
//         // const config:AxiosRequestConfig = {headers:{"Accept":"application/json"}}
//         const response = await axios.put(url,arg)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }
 
// export const getChurchDenomination = async ():Promise<IResponse<IDenomination[]>> => {
//     try{
//         const url = `/mock/denomination.json`

//         const response = await axios.get(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const getDiocese = async ():Promise<IResponse<IDiocese[]>> => {
//     try{
//         const url = `${baseUrl}/getDiocese`
//         const response = await axios.get(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }
// export const getChurchByDenomination = async (denomationId:number,stateId:number) => {
//     try{
//         const url = `${baseUrl}/getchurchbydenomination?denominationId=${denomationId}&stateId=${stateId}`
//         const response = await axios.get(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const updateChurch = async (updateChurch:IChurchResponse) => {
//     try{
//         const url = `${baseUrl}/UpdateChurch`
//         const config:AxiosRequestConfig = {headers:{"Content-Type":"application/json-patch+json"}}
//         const response = await axios.post(url,updateChurch)
//         return response.data    
//     }catch(err){
//         throw err
//     }
// }
// export const getChurchMember = async (churchId:number):Promise<IResponse<IChurchMember[]>> => {
//     try{
//         const url = `${baseUrl}/GetChurchMember?churchId=${churchId}`
//         const response = await axios.get(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }
// export const createChurchBankDetail = async (newBankDetail:IChurchBankDetail) => {
//     try{
//         const url = `${baseUrl}/createChurchBankDetail`
//         const config:AxiosRequestConfig = {headers:{"Content-Type":"application/json-patch+json"}}
//         const response = await axios.post(url,newBankDetail)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }
// export const getChurchBankAccount = async (churchId:number,cancelToken:CancelTokenSource):Promise<IResponse<IChurchBankDetail[]>> => {
//     try{
//         const url = `${baseUrl}/getchurchBankAccountByChurch?churchId=${churchId}`
//         const response = await axios.get(url,{
//             cancelToken:cancelToken.token
//         })
//         return response.data
//     }catch(err){
//         throw err
//     }
// }