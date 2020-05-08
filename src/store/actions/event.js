import axios from 'axios'
import * as actionTypes from './actionTypes'

export const setActiveEventId = (eventId)=>{
    console.log('siema')
    return dispatch=>{
        dispatch({
            type:actionTypes.SET_ACTIVE_EVENT,
            activeEventId : eventId 
        })
    }
}

export const setMyEvents = (events)=>{
    console.log('Przejęte eventy: ')
    console.log(events)
    return dispatch=>{
        dispatch({
            type:actionTypes.SET_MY_EVENTS,
            myEvents:events
        })
    }
}