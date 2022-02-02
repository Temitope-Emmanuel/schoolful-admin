import { IChurch } from "./Church";
import { IDataCaptureSetting } from "./DataCaptureSetting";
import {IPerson} from "./Person"

export interface IState {
    state:string;
    person:IPerson[];
    city:ICity[];
    church:IChurch;
    country:string;
    dataCaptureSetting:IDataCaptureSetting;
    name: string;
    capital: string;
}

export interface ICity {
    cityID:number;
    name:string;
    stateID:number;
    person:IPerson[];
    churchs:IChurch[];
    state:IState
}

export interface ICountry {
    countryID:number;
    sortname:string;
    name:string;
    phoneCode:number;
    persons:IPerson[];
    churchs:IChurch[];
    states:IState[]
}

