import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'
import { setMyEvents } from '../actions'
import { setSchedule, setCollaborators } from '../actions/event'


const initialState = {
    activeEventId: null,
    myEvents:[],
    schedule:[],
    collaborators:[],
    toDoListId:null
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
const setCollaboratorsHandler = (state, action)=>{
    return updateObject(state, {collaborators : action.collaborators})
}
const setToDoListIdHandler = (state, action)=>{
    console.log(`ID: ${action.id}`)
    return updateObject(state, {toDoListId:action.id})
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_ACTIVE_EVENT : return setActiveEventId(state, action)
        case actionTypes.SET_MY_EVENTS : return setMyEvents2(state, action)
        case actionTypes.SET_SCHEDULE : return setScheduleHandler(state,action)
        case actionTypes.SET_COLLABORATORS : return setCollaboratorsHandler(state, action)
        case actionTypes.SET_To_DO_LIST_ID : return setToDoListIdHandler(state, action)
        default:
            return state
    }
}
export default reducer
