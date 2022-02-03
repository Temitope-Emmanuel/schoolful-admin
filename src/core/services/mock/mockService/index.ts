import MockAdapter from "axios-mock-adapter/types";
import {utilityMock} from './utility.mock'
import {churchMock} from './church.mock'
import {accountMock} from './account.mock'
import {userMock} from './user.mock';
import {activityMock} from "./activity.mock";
import {groupMock} from "./group.mock";
import {sermonMock} from "./sermon.mock";
import {advertMock} from "./advert.mock";
import {subscriptionMock} from "./subscription.mock";
import {paymentMock} from "./payment.mock";
import {donationMock} from "./donation.mock";

export const initFunction = (mock:MockAdapter) => {
    userMock(mock);
    churchMock(mock);
    accountMock(mock);
    utilityMock(mock);
    activityMock(mock);
    groupMock(mock);
    sermonMock(mock);
    advertMock(mock);
    subscriptionMock(mock);
    paymentMock(mock);
    donationMock(mock);
}