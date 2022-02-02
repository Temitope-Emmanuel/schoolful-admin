import MockAdapter from "axios-mock-adapter/types";
import {utilityMock} from './utility.mock'
import {churchMock} from './church.mock'
import {accountMock} from './account.mock'
import {userMock} from './user.mock';

export const initFunction = (mock:MockAdapter) => {
    utilityMock(mock);
    churchMock(mock);
    accountMock(mock);
    userMock(mock);
}