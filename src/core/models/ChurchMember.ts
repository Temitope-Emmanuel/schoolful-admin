import {IGroup} from "core/models/Group"


export interface IChurchMember {
  churchMemberID?:string;
  username: string;
  password: string;
  phoneNumber?: number | null;
  email: string;
  firstname: string;
  lastname: string;
  genderID?: number;
  state?: string;
  city?: string;
  role?:string[] | string;
  group?: IGroup[];
  picture_url?: string;
  claims?: string[];
  status?:number;
  churchID?:number;
}
