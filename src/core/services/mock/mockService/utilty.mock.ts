import MockAdapter from "axios-mock-adapter/types"
import states from '../data/states.json'

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Utility`
export const utilityMock = (mock: MockAdapter) => {
  
  mock.onGet(`${baseUrl}/getStates`).reply(200, states)

}

// export const getGroupPosition = async ():Promise<IResponse<ILeaderPosition[]>> => {
//     try{
//         const url = `${baseUrl}/getallLeadersPosition`
//         const response = await axios.get(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const getCity = async (stateId:number):Promise<IResponse<ICity[]>> => {
//     try{
//         const url = `${baseUrl}/city/${stateId}`
//         const response = await axios.get(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }
// export const getBanks = async ():Promise<IResponse<IBank[]>> => {
//     try{
//         const url = `${baseUrl}/GetBanks`
//         const response = await axios.get(url)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }