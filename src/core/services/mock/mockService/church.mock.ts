import MockAdapter from "axios-mock-adapter/types"
import { ChurchStatus } from "core/enums/Church"
import denomination from '../data/denomination.json'
import churchBankAccount from '../data/churchAccount.json'
import churchMember from '../data/churchMember.json'

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Church`

export const churchMock = (mock: MockAdapter) => {

  // Get Denomination
  mock.onGet(`${baseUrl}/getDenomination`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:denomination
  })

  // Create church
  mock.onPost(`${baseUrl}/createChurch`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:[]
  })

  mock.onPost(`${baseUrl}/createChurchBankDetail`).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:churchBankAccount[3]
  })

  // Get Church
  const getChurchUrl = `${baseUrl}/getchurchbyId`;
  const url = new RegExp(`${getChurchUrl}/*`);

  mock.onGet(url).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:{
      churchBarner:'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
      status:ChurchStatus.ACTIVE,
      email:'church@gmail.com',
      country:'Nigeria',
      priestName:'Priest Name',
    }
  })

  // Get Church
  const getChurchAccountUrl = `${baseUrl}/getchurchBankAccountByChurch`;
  mock.onGet(new RegExp(`${getChurchAccountUrl}/*`)).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:churchBankAccount
  })

  // Get Church Member
  const getChurchMemberUrl = `${baseUrl}/GetChurchMemberByChurchID`;
  mock.onGet(new RegExp(`${getChurchMemberUrl}/*`)).reply(200, {
    status:200,
    isSuccessful:true,
    message:'',
    data:{
      currentPage:1,
      pageSize:1,
      records:churchMember,
      totalPages:1,
      totalRecords:1
    }
  })
}