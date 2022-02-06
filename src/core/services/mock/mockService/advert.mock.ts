import MockAdapter from "axios-mock-adapter/types"
import adverts from '../data/advert.json'
import advertSetting from '../data/advertSetting.json';

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Sponsor`

export const advertMock = (mock: MockAdapter) => {

  // Get Advert Setting
  mock.onGet(`${baseUrl}/getSponsorSetting`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:advertSetting
  })

  // Get Advert
  const getAdvert = `${baseUrl}/getSponsor`;
  mock.onGet(new RegExp(`${getAdvert}/*`)).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:adverts
  })
}