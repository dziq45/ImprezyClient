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
        axios.get('/scheduledetail/getbyscheduleid/' + scheduleID)
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