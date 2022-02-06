import MockAdapter from "axios-mock-adapter/types"
import announcement from '../data/announcement.json'

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Infomation`

export const announcementMock = (mock: MockAdapter) => {

    const getAnnouncementUrl = `${baseUrl}/GetAnnouncementByChurch`;
    
    mock.onGet(new RegExp(`${getAnnouncementUrl}/*`)).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:announcement
    })

    mock.onPost(`${baseUrl}/AddAnnouncement`).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:announcement
    })
}