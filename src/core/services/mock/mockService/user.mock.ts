import MockAdapter from "axios-mock-adapter/types"

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/Auth`

export const userMock = (mock: MockAdapter) => {

    const assignRoleClaim = `${baseUrl}/AssignRoleClaimToUser?`;
    const url = new RegExp(`${assignRoleClaim}/*`);
    
    mock.onPost(url).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data:{
            staffID: '123455',
        }
    })
    mock.onPost(`${baseUrl}/userLogin`,).reply(200, {
        status:200,
        isSuccessful:true,
        message:'',
        data: {
            id:'1234-5678',
            auth_token:'2nsdinwojnionnONKJkj',
            refreshToken:'sdmmwopAMJKLKLKmsdksdjskdjdsjsdjksdskdk',
            fullname:'Temitope Ojo',
            phoneNumber:'09071234789',
            email:'email@gmail.com',
            expirationTime:'22147',
            churchId:1,
            role:[]
        }
    })
}