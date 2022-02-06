import MockAdapter from "axios-mock-adapter/types"
import groups from '../data/group.json'
import groupMember from '../data/groupMember.json'

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Church`

export const groupMock = (mock: MockAdapter) => {

    const getGroupUrl = `${baseUrl}/getSocietyByChurch`;
    mock.onGet(new RegExp(`${getGroupUrl}/*`)).reply(200, {
      status:200,
      isSuccessful:true,
      message:'',
      data:groups
    })
    
    const getGroupMemberUrl = `${baseUrl}/GetSocietyMember`;
    mock.onGet(new RegExp(`${getGroupMemberUrl}/*`)).reply(200, {
      status:200,
      isSuccessful:true,
      message:'',
      data:groupMember
    })
    mock.onPost(`${baseUrl}/createSocietyMember`).reply(200, {
      status:200,
      isSuccessful:true,
      message:'',
      data:groupMember
    })
    const deleteGroupUrl = `${baseUrl}/deleteGroup`
    mock.onDelete(new RegExp(`${deleteGroupUrl}/*`)).reply(200, {
      status:200,
      isSuccessful:true,
      message:'',
      data:groups[0]
    })
    mock.onPost(`${baseUrl}/createGroup`).reply(200, {
      status:200,
      isSuccessful:true,
      message:'',
      data:groups[0]
    })
}