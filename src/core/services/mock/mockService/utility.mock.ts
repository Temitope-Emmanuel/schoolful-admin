import MockAdapter from "axios-mock-adapter/types"
import states from '../data/states.json'
import cities from '../data/cities.json'
import positions from '../data/groupPosition.json'

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Utility`
export const utilityMock = (mock: MockAdapter) => {
  
  mock.onGet(`${baseUrl}/getStates`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:states
  })
  
  const getStatesUri = `${baseUrl}/city`;
  const url = new RegExp(`${getStatesUri}/*`);

  mock.onGet(url).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:cities
  })

  mock.onGet(`${baseUrl}/getAllPosition`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:positions
  })

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