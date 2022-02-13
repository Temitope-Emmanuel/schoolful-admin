import MockAdapter from "axios-mock-adapter/types"
import activity from "../data/activity.json"
import event from "../data/event.json"
const baseUrl = `${process.env.REACT_APP_SERVER_URL}`

export const activityMock = (mock: MockAdapter) => {

  // Get Activity
  const getActivityUrl = `${baseUrl}/Activity/GetChurchActivityByChurchID`;
  mock.onGet(new RegExp(`${getActivityUrl}/*`)).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:activity
  })

  // Get Event
  const getEventUrl = `${baseUrl}/Event/GetChurchEventByChurchID`;
  mock.onGet(new RegExp(`${getEventUrl}/*`)).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:event
  })

  mock.onPost(`${baseUrl}/Activity/CreateActivity`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:{
      activityID:'',
      schedule:'',
      recuring:'',
    }
  })

  mock.onPost( `${baseUrl}/Activity/CreateEvents`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:{
      eventId:'',
      schedule:'',
      startDateTime:'',
      endDateTime:'',
  }
  })

}