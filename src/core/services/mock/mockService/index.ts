import MockAdapter from "axios-mock-adapter/types";
import {utilityMock} from './utilty.mock'
import {churchMock} from './church.mock'

export const initFunction = (mock:MockAdapter) => {
    utilityMock(mock);
    churchMock(mock);
}