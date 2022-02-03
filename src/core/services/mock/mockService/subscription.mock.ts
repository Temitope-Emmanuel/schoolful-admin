import MockAdapter from "axios-mock-adapter/types"
import subscriptionPlan from '../data/subscriptionPlan.json'
import churchSubscription from '../data/churchSubscription.json'

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Subscription`

export const subscriptionMock = (mock: MockAdapter) => {

  // Get Subscription Plan
  mock.onGet(`${baseUrl}/getSubscriptionPlan`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:subscriptionPlan
  })

  // Get Subscription for church
  const getSubscriptionByChurch = `${baseUrl}/getSubscriptionsByChurchID`;
  const url = new RegExp(`${getSubscriptionByChurch}/*`);
  mock.onGet(url).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:churchSubscription
  })

}

// export const getSubscriptionById = async(subscriptionId:string,cancelToken?:CancelTokenSource):Promise<IResponse<ISubscription[]>> => {
//     try{
//         const url = `${baseUrl}/getSubscriptionById?Id${subscriptionId}`
//         const response = await axios.get(url,{
//             ...(cancelToken && {cancelToken:cancelToken.token})
//         })
//         return response.data
//     }catch(err){
//         throw err
//     }
// }
// export const getSubscriptionByChurchId = async(churchId:string,cancelToken?:CancelTokenSource):Promise<IResponse<SubscriptionByChurch[]>> => {
//     try{
//         const url = `${baseUrl}/getSubscriptionsByChurchId?churchId=${churchId}`
//         const response = await axios.get(url,{
//             ...(cancelToken && {cancelToken:cancelToken.token})
//         })
//         return response.data
//     }catch(err){
//         throw err
//     }
// }