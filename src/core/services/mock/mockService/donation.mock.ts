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