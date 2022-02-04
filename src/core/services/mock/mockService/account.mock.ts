import MockAdapter from "axios-mock-adapter/types"
import staffMember from '../data/staffMember.json'
import churchMember from '../data/churchMember.json'

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Account`

export const accountMock = (mock: MockAdapter) => {
  // Create Staff
  mock.onPost(`${baseUrl}/createStaff`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:staffMember[0]
  })

  // Get Church Staff
  const getStaffUrl = `${baseUrl}/GetStaffByChurch`;
  mock.onGet(new RegExp(`${getStaffUrl}/*`)).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:staffMember
  })

  // Get Church Staff
  const getChurchMemberRoleUrl = `${baseUrl}/getUserByRoleAndChurchId`;
  mock.onGet(new RegExp(`${getChurchMemberRoleUrl}/*/*`)).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:{
      currentPage:1,
      pageSize:50,
      records:churchMember,
      totalPages:1,
      totalRecords:50
    }
  })
}


// export const createChurchMember = async (newChurchMember:IChurchMember):Promise<IResponse<IChurchMember>> => {
//     try{
//         const url = `${baseUrl}/createChurchMembers`
//         const response = await axios.post(url,newChurchMember)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const createStaff = async(newStaff:IChurchMember):Promise<IResponse<IStaff>> => {
//     try{
//         const url = `${baseUrl}/createStaff`
//         // const config:AxiosRequestConfig = {headers:{"Content-Type":"application/json-patch+json"}}
//         const response = await axios.post(url,newStaff)
//         return response.data
//     }catch(err){
//         throw err
//     }

// }

// export const getStaffByChurch = async (churchId:number,cancelToken:CancelTokenSource):Promise<IResponse<IStaff[]>> => {
//     try{
//         const url = `${baseUrl}/GetStaffByChurch?churchId=${churchId}`
//         const response = await axios.get(url,{
//             cancelToken:cancelToken.token
//         })
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const getUserChurchInfo = async (personId:string):Promise<IResponse<IChurch>> => {
//     try{
//         const url = `${baseUrl}/GetUserChurchInfo?personId=${personId}`
//         const response = await axios.get(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const allRoles = async ():Promise<IResponse<IRole[]>> => {
//     try{
//         const url = `${baseUrl}/AllRoles`
//         const response = await axios.get(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const editStaff = async (edittedStaff:IStaff):Promise<IResponse<IStaff>> => {
//     const url = `${baseUrl}/editStaff`
//     try{
//         const response = await axios.put(url,edittedStaff)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const suspendStaff = async (suspendStaffId:string):Promise<IResponse<null>> => {
//     const url = `${baseUrl}/suspendStaff?pseronId=${suspendStaffId}`
//     try{
//         const response = await axios.put(url)
//         return response.data
//     }catch(err){
//         throw err
//     }

// }
// export const deleteStaff = async (deleteStaffId:string):Promise<IResponse<null>> => {
//     const url = `${baseUrl}/deleteStaff?personId=${deleteStaffId}`
//     try{
//         const response = await axios.delete(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }
// export const getUserByRoleAndChurchId = async({
//     churchId,page,count,role,cancelToken
// }:{
//     role:"ChurchMember" | "ChurchAdmin";
//     churchId:number;
//     page:number;
//     count:number;
//     cancelToken?:CancelTokenSource
// }):Promise<IResponse<PaginatedResult<IChurchMember>>> => {
//     try{
//         const url = `${baseUrl}/getUserByRoleAndChurchId?role=${role}&churchId=${churchId}&page=${page}&count=${count}`
//         const response = await axios.get(url,{
//             cancelToken:cancelToken?.token
//         })
//         return response.data
//     }catch(err){
//         throw err
//     }
// }