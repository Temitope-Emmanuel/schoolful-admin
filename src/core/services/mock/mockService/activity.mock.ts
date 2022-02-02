import MockAdapter from "axios-mock-adapter/types"

const baseUrl = `${process.env.REACT_APP_SERVER_URL}`

export const activityMock = (mock: MockAdapter) => {

  // Get Activity
  const getActivityUrl = `${baseUrl}/Activity/GetChurchActivityByChurchID`;
  mock.onGet(new RegExp(`${getActivityUrl}/*`)).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:[]
  })

  // Get Event
  const getEventUrl = `${baseUrl}/Event/GetChurchEventByChurchID`;
  mock.onGet(new RegExp(`${getEventUrl}/*`)).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:[]
  })

}

// export const createActivity = async (arg:IActivity):Promise<IResponse<IActivity>> => {
//     const url = `${baseUrl}/Activity/CreateActivity`
//     try{
//         const config:AxiosRequestConfig = {headers:{
//             "Content-Type":"application/json-patch+json",
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//         }}
//         const response = await axios.post(url,arg)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const updateActivity = async (arg:Partial<IActivity>):Promise<IResponse<IActivity>> => {
//     const url = `${baseUrl}/Activity/UpdateActivity`
//     try{
//         const config:AxiosRequestConfig = {headers:{"Content-Type":"application/json-patch+json"}}
//         const response = await axios.put(url,arg)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const getChurchActivity = async (churchId:string,cancelToken:CancelTokenSource):Promise<IResponse<IActivity[]>> => {
//     const url = `${baseUrl}/Activity/GetChurchActivity?churchId=${churchId}`
//     try{
//         const config:AxiosRequestConfig = {headers:{Accept:"text/plain"},cancelToken:cancelToken.token}
//         const response = await axios.get(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const createEvent = async (arg:IEvent):Promise<IResponse<IEvent>> => {
//     try{
//         const url = `${baseUrl}/Activity/CreateEvents`
//         const config:AxiosRequestConfig = {headers:{"Content-Type":"application/json-patch+json"}}
//         const response = await axios.post(url,arg)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const updateEvent = async (arg:Partial<IEvent>):Promise<IResponse<IEvent>> => {
//     const url = `${baseUrl}/Activity/UpdateEvents`
//     try{
//         const config:AxiosRequestConfig = {headers:{"Content-Type":"application/json-patch+json"}}
//         const response = await axios.put(url,arg)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const getChurchEvent = async (churchId:string,cancelToken:CancelTokenSource):Promise<IResponse<IEvent[]>> => {
//     const url = `${baseUrl}/Activity/GetChurchEvent?churchId=${churchId}`
//     try{
//         const config:AxiosRequestConfig = {headers:{Accept:"text/plain"},cancelToken:cancelToken.token}
//         const response = await axios.get(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }
// export const getEventByID = async (eventId:string,cancelToken:CancelTokenSource):Promise<IResponse<IEvent>> => {
//     const url = `${baseUrl}/Activity/GetEventById?id=${eventId}`
//     try{
//         const config:AxiosRequestConfig = {headers:{Accept:"text/plain"},cancelToken:cancelToken.token}
//         const response = await axios.get(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }