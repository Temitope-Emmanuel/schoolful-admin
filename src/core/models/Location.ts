import { IChurch } from "./Church";
import {IPerson} from "./Person"

export interface IState {
    state:string;
    city:ICity[];
    church:IChurch;
    country:string;
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

