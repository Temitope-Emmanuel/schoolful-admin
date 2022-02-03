import {GroupState,Action,ActionTypes} from "./types"
import {IGroupMember} from "core/models/Group"

const initialState:GroupState = {
    groups:[],
    currentGroup:{
        groupID:0,
        name:"",
        description:"",
        imageUrl:"",
        churchID:0,
        groupMember:[],
        
    }
}


export function groupReducer(state = initialState,action:Action):GroupState {
    switch(action.type){
        case ActionTypes.LOAD_GROUPS_FOR_CHURCH:
            return {
                ...state,
                groups:action.payload
            };
        case ActionTypes.CREATE_GROUP:
            return{
                ...state,
                // groups:[action.payload,...state.groups],
                // currentGroup:action.payload
            };
        case ActionTypes.CREATE_GROUP_MEMBER:{
            const filterGroups = [...state.groups]
            const foundIdx = filterGroups.findIndex(x => x.groupID === state.currentGroup.groupID)
            if(foundIdx){
                const newUpdatedGroup = {
                    ...filterGroups[foundIdx],
                    memberCount:filterGroups[foundIdx]?.groupMember?.length ?( filterGroups[foundIdx].groupMember?.length ?? 0)+1 : 1
                }
                filterGroups.splice(foundIdx,1,newUpdatedGroup)
            }
                let newGroupMember:IGroupMember = {
                    groupMemberID:action.payload[0].groupMemberID,
                    personID:action.payload[0].personID,
                    churchID:action.payload[0].churchID,
                    groupID:action.payload[0].groupID,
                    positionName:"",
                    pictureUrl:action.payload[0].pictureUrl,
                    fullName:action.payload[0].fullName,
                }
            return{
                ...state,
                groups:[...filterGroups],
                // groups:[action.payload,...state.groups],
                currentGroup:{
                    ...state.currentGroup,
                    groupMember:[
                        ...(state.currentGroup.groupMember as IGroupMember[] || []),
                        newGroupMember as any
                    ]
                }
            };
        }
        case ActionTypes.LOAD_CURRENT_GROUP:{
            const currentGroupIdx = state.groups.findIndex((item,idx) => item.groupID as any === action.payload)
            return{
                ...state,
                currentGroup:state.groups[currentGroupIdx]
            };
        }
        case ActionTypes.LOAD_CURRENT_GROUP_MEMBER:{
            return{
                ...state,
                currentGroup:{
                    ...state.currentGroup,
                    groupMember:action.payload
                }
            }
        }
        case ActionTypes.UPDATE_GROUP:{
            const filterGroups = [...state.groups]
            const foundIdx = filterGroups.findIndex(x => x.groupID === action.payload.groupID)
            filterGroups.splice(foundIdx,1,action.payload)
            return {
                ...state,
                currentGroup:action.payload,
                groups:filterGroups
            };
        }
        case ActionTypes.DELETE_GROUP:{
            const filterGroups = [...state.groups]
            const foundIdx = filterGroups.findIndex(x => x.groupID === action.payload)
            filterGroups.splice(foundIdx,1)
            return{
                ...state,
                groups:filterGroups,
                currentGroup:initialState.currentGroup
            }
        }
        default:
        return state;
}
}