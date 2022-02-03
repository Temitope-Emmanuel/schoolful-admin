import MockAdapter from "axios-mock-adapter/types"
import churchDonation from '../data/churchDonation.json'

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Donation`

export const donationMock = (mock: MockAdapter) => {
    // Get church donation
    const getDonationUri = `${baseUrl}/GetDonationByChurch`;
    const url = new RegExp(`${getDonationUri}/*`);
    mock.onGet(url).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:churchDonation
    })  

    mock.onPost(`${baseUrl}/AddDonation`).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:(churchDonation as any)[3]
    })  
}

// export const AddDonation = async(newDonation:IDonation):Promise<IResponse<IDonation>> => {
//     try{
//         const url = `${baseUrl}/AddDonation`
//         const config:AxiosRequestConfig = {headers:{"Content-Type":"application/json-patch+json"}}
//         const response = await axios.post(url,newDonation,config)
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const GetDonationByChurch = async (churchId:number,cancelToken:CancelTokenSource):Promise<IResponse<IDonation[]>> => {
//     try{
//         const url = `${baseUrl}/GetDonationByChurch/${churchId}`
//         const response = await axios.get(url,{
//             cancelToken:cancelToken.token
//         })
//         return response.data
//     }catch(err){
//         throw err
//     }
// }

// export const GetDonationTransactionByChurch = async (churchId:number,cancelToken:CancelTokenSource):Promise<IResponse<IDonation>> => {
//     try{
//         const url = `${baseUrl}/GetDonationTransactionsByChurch?churchId=${churchId}`
//         const response = await axios.get(url,{
//             cancelToken:cancelToken.token
//         })
//         return response.data
//     }catch(err){
//         throw err
//     }
// }