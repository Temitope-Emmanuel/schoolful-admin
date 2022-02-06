import MockAdapter from "axios-mock-adapter/types"
import sermons from "../data/sermon.json"
import churchDonations from "../data/churchDonation.json"

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Payment`;

export const paymentMock = (mock: MockAdapter) => {

    // Create reference
    mock.onGet(`${baseUrl}/generateReference`).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:sermons
    })

    // Get church donation
    const getChurchDonation = `${baseUrl}/GetChurchOnlyDonationTransactions`;
    mock.onGet(new RegExp(`${getChurchDonation}/*`)).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:churchDonations
    })

    // Get church donation
    const withdrawalChurchDonation = `${baseUrl}/WithdrawalToChurch`;
    mock.onPost(new RegExp(`${withdrawalChurchDonation}/*`)).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:null
    })
}