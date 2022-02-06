import MockAdapter from "axios-mock-adapter/types"
import prayerRequest from '../data/prayerRequest.json'
import testimony from '../data/testimony.json'
import prayer from '../data/prayer.json'

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Prayer`

export const prayerMock = (mock: MockAdapter) => {
    // Get Church Prayer Request
    const getChurchPrayerUrl = `${baseUrl}/GetPrayerRequest`;
    mock.onGet(new RegExp(`${getChurchPrayerUrl}/*`)).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:prayerRequest
    })
    
    // Get Church Testimony
    const getChurchTestimonyrUrl = `${baseUrl}/GetTestimony`;
    mock.onGet(new RegExp(`${getChurchTestimonyrUrl}/*`)).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:testimony
    })

    // Change Testimony Status
    mock.onPut(`${baseUrl}/ChangeTestimonyStatus`).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:null
    })
    
    // Get Church Prayer
    mock.onGet(`${baseUrl}/GetPrayer`).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:prayer
    })

    // Create Church Prayer
    mock.onPost(`${baseUrl}/AddPrayer`).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:prayer[0]
    })

    // Add to prayed
    mock.onGet(`${baseUrl}/PrayPrayerRequest`).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:null
    })

    // Get Daily Verse
    const getDailyVerseUrl = `${baseUrl}/GetDailyReading`;
    mock.onGet(new RegExp(`${getDailyVerseUrl}/*`)).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:[]
    })

    // Comment on testimony
    mock.onPost(`${baseUrl}/CommentOnTestimony`).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:[]
    })
}