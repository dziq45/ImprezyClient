import React, {useEffect} from 'react';
import axios from 'axios'

const EventForm = (props)=>{
    useEffect(()=>{
        async function fetchdata (){
            const response = await axios.get('/event/all')
            console.log(response)
        }
        fetchdata()}, []
    )
    return(
        <div>siema</div>
    )
}
export default EventForm