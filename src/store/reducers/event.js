import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'
import { setMyEvents } from '../actions'
import { setSchedule } from '../actions/event'


const initialState = {
    activeEventId: null,
    myEvents:[],
    schedule:[]
}
const setActiveEventId = (state, action)=>{
    return updateObject(state, {activeEventId : action.activeEventId})
}
const setMyEvents2= (state, action)=>{
    return updateObject(state, {myEvents : action.myEvents})
}
const setScheduleHandler = (state,action)=>{
    console.log(action.schedule)
    return updateObject(state, {schedule : action.schedule})
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_ACTIVE_EVENT : return setActiveEventId(state, action)
        case actionTypes.SET_MY_EVENTS : return setMyEvents2(state, action)
        case actionTypes.SET_SCHEDULE : return setScheduleHandler(state,action)
        default:
            return state
    }
}
export default reducer
