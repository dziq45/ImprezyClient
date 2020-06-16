import axios from 'axios'
import * as actionTypes from './actionTypes'
import Planning from '../../components/Event/Planning'
import {apiCaller} from '../../apiCaller' 


export const setActiveEventId = (eventId)=>{
    console.log('siema')
    return dispatch=>{
        dispatch({
            type:actionTypes.SET_ACTIVE_EVENT,
            activeEventId : eventId 
        })
    }
}

const isTheSameDay = (date1, date2)=>{
    return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
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
export const setSchedule= (scheduleID)=>{
    return dispatch=>{
        apiCaller().get('/scheduledetail/getbyscheduleid/' + scheduleID)
        .then(res=>{
            console.log(res.data)
            let items = res.data
            items.sort((a,b)=>{
                let dateA = new Date(a.timestart)
                console.log(`dataA: ${dateA}`)
                let dateB = new Date(b.timestart)
                return dateA - dateB
            })
            let newEachDay=[]
            let lastDate = new Date(items[0].timestart)
            let lastDay=0
            newEachDay.push({
                date:lastDate,
                items:[
                    {
                        hour: lastDate.getHours(),
                        minute: lastDate.getMinutes(),
                        description: items[0].description,
                        hovered:false
                    }
                ]
            })
            for(let i = 1; i <items.length; i++){
                let newDate = new Date(items[i].timestart)
                if(isTheSameDay(lastDate, newDate)){
                    newEachDay[lastDay].items.push({
                        hour: newDate.getHours(),
                        minute: newDate.getMinutes(),
                        description: items[i].description,
                        hovered:false
                    })
                }
                else{
                    lastDay++
                    lastDate = newDate
                    newEachDay.push({
                        date: newDate,
                        items:[{
                            hour: newDate.getHours(),
                            minute: newDate.getMinutes(),
                            description: items[i].description,
                            hovered:false
                        }]
                    })
                }
            }
            console.log('Pobrane wszystkie itemy i sparsowane')
            console.log(newEachDay)
            dispatch({
                type:actionTypes.SET_SCHEDULE,
                schedule:newEachDay
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const setCollaborators = (eventId)=>{
    //getting all and then filtering by eventid
    let eventPeople=[]
    return dispatch=>{
        apiCaller().get('/eventperson/all')
        .then(async res=>{
            console.log(res.data)
            for(let eventPerson of res.data){
                console.log(eventPerson)
                if(eventPerson.eventPersonId.eventid === eventId){
                    let result = await apiCaller().get('/person/get/' + eventPerson.eventPersonId.personid)
                    console.log('RESULT')
                    console.log(result)
                    eventPeople.push({
                        personId : eventPerson.eventPersonId.personid,
                        email : result.data.email,
                        name : eventPerson.role.rolename
                    })
                }
            }
            console.log(eventPeople)

            dispatch({
                type:'SET_COLLABORATORS',
                collaborators:eventPeople
            })
        })
    }
    
}
export const setToDoListId = (id)=>{
    console.log(`action id ${id}`)
    return dispatch=>{
        dispatch({
            type:'SET_To_DO_LIST_ID',
            id:id 
        })
    }
}