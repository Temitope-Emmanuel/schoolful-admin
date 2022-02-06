import MockAdapter from "axios-mock-adapter/types"
import sermons from "../data/sermon.json"

const baseUrl = new URL(`${process.env.REACT_APP_SERVER_URL}/Sermon`)

export const sermonMock = (mock: MockAdapter) => {

    const getSermonUrl = `${baseUrl}/GetSermonByChurchID`;
    const url = new RegExp(`${getSermonUrl}/*`);
    
    mock.onGet(url).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:sermons
    })

    mock.onPost(`${baseUrl}/CreateSermon`).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:sermons[0]
    })
}