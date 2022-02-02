import MockAdapter from "axios-mock-adapter/types"

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Auth`

export const userMock = (mock: MockAdapter) => {

    const assignRoleClaim = `${baseUrl}/AssignRoleClaimToUser?`;
    const url = new RegExp(`${assignRoleClaim}/*`);
    
    mock.onPost(url).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:{
            staffID: '123455',
        }
    })
    mock.onPost(`${baseUrl}/userLogin`,).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data: {
            id:'1234-5678',
            auth_token:'2nsdinwojnionnONKJkj',
            refreshToken:'sdmmwopAMJKLKLKmsdksdjskdjdsjsdjksdskdk',
            fullname:'Temitope Ojo',
            phoneNumber:'09071234789',
            email:'email@gmail.com',
            expirationTime:'22147',
            churchId:1,
            role:[]
        }
    })
}

// export async function login(username:string,password:string):Promise<IResponse<LoginData>>{
//     try{
//         const url = `${baseUrl}/userLogin`
//         const request:Login ={
//             username,
//             password
//         }
//         const headers:AxiosRequestConfig = { headers: { "Access-Control-Allow-Origin": "*" } }
//         const response = await axios.post(url,request,headers);
//         return response.data;
//     }catch(err){
//         throw err
//     }
// }

// export async function verifyToken(token:string){
//     const url = `${baseUrl}/refreshToken?refreshToken=${encodeURIComponent(token)}`;
//     try{
//         const response = await axios.get(url);
//         return response.data
//     }catch(error){
//         throw error
//     }
// }

// export async function getAllClaims(cancelToken:CancelTokenSource):Promise<IResponse<IClaim[]>> {
//     const url = `${baseUrl}/GetAllClaims`
//     try{
//         const response = await axios.get(url,{
//             cancelToken:cancelToken.token
//         })
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export async function createRole(arg:string):Promise<IResponse<IRole>> {
//     const url = `${baseUrl}/CreateRole?`.concat(arg)
    
//     try{
//         const response = await axios.post(String(url))
//         return response.data
//     }catch(err){
//         throw err
//     }
// }
// export async function createRoleClaim(arg:string):Promise<IResponse<IRole>> {
//     const url = `${baseUrl}/CreateRoleClaim?`.concat(arg)
//     try{
//         const response = await axios.post(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export async function getAllRoleByChurchId(churchId:number,cancelToken:CancelTokenSource):Promise<IResponse<IRole[]>>{
//     const url = `${baseUrl}/GetAllRoleByChurchId?churchId=${churchId}`
//     try{
//         const response = await axios.get(url,{
//             cancelToken:cancelToken.token
//         })
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export async function UpdateRole(arg:string):Promise<IResponse<IRole>> {
//     const url = `${baseUrl}/UpdateRole?`.concat(arg)
//     try{
//         const response = await axios.post(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }
// export async function deleteRole(arg:string):Promise<IResponse<null>> {
//     const url = `${baseUrl}/DeleteRole?`.concat(arg)
//     try{
//         const response = await axios.post(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export async function assignClaimToUser(arg:string):Promise<IResponse<null>>{
//     const url = `${baseUrl}/AssignClaimToUser`.concat(arg)
//     try{
//         const response = await axios.post(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export async function removeClaimFromUser(arg:string):Promise<IResponse<null>>{
//     const url = `${baseUrl}/RemoveClaimFromUser`.concat(arg)
//     try{
//         const response = await axios.post(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export async function removeRoleFromUser(arg:string):Promise<IResponse<null>> {
//     const url = `${baseUrl}/RemoveRoleFromUser`.concat(arg)
//     try{
//         const response = await axios.post(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export async function changeRoleClaimOfUser(arg:string):Promise<IResponse<null>>{
//     const url = `${baseUrl}/ChangeRoleClaimOfUser`.concat(arg)
//     try{
//         const response = await axios.post(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }
