import MockAdapter from "axios-mock-adapter/types"
import staffMember from '../data/staffMember.json'
import churchMember from '../data/churchMember.json'

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Account`

export const accountMock = (mock: MockAdapter) => {
  // Create Staff
  mock.onPost(`${baseUrl}/createStaff`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:staffMember[0]
  })

  // Get Church Staff
  const getStaffUrl = `${baseUrl}/GetStaffByChurch`;
  mock.onGet(new RegExp(`${getStaffUrl}/*`)).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:staffMember
  })

  // Get Church Staff
  const getChurchMemberRoleUrl = `${baseUrl}/getUserByRoleAndChurchId`;
  mock.onGet(new RegExp(`${getChurchMemberRoleUrl}/*/*`)).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:{
      currentPage:1,
      pageSize:50,
      records:churchMember,
      totalPages:1,
      totalRecords:50
    }
  })
}