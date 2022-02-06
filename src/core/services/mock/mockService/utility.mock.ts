import MockAdapter from "axios-mock-adapter/types"
import states from '../data/states.json'
import cities from '../data/cities.json'
import positions from '../data/groupPosition.json'
import banks from '../data/banks.json'

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

  mock.onGet(`${baseUrl}/GetBanks`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:banks
  })
}