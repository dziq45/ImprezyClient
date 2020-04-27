import axios from 'axios'
import * as actionTypes from './actionTypes'

export const setid = (eventId)=>{
    return {
        type:actionTypes.SET_ACTIVE_EVENT,
        activeEventId : eventId
    }
}
export const setActiveEventId = (eventId)=>{
    console.log('siema')
    return dispatch=>{
        dispatch(setid(eventId))
    }
}