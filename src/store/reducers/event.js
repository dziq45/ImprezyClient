import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'


const initialState = {
    activeEventId: null
}
const setActiveEventId = (state, action)=>{
    return updateObject(state, {activeEventId : action.activeEventId})
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_ACTIVE_EVENT : return setActiveEventId(state, action)
        default:
            return state
    }
}
export default reducer
