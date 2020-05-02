import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'   

    
const EventForm = (props) => {
    const [descriptionText, setdescriptionText] = useState('')
    const [typeText, settypeText] = useState('')
    const [cityText, setcityText] = useState('')
    const [streetText, setstreetText] = useState('')
    const [numberText, setnumberText] = useState(0)
    const [subNumberText, setsubNumberText] = useState(0)
    const [errorText, setErrorText] = useState('')

    useEffect(()=>{
        console.log("Entered")
        const fetchData = async()=>{
            try{
                const response = await axios.get('/event/get/' + props.eventId)
                console.log(response.data)
                setdescriptionText(response.data.description)
                settypeText(response.data.eventtype)
                setcityText(response.data.address.city)
                setstreetText(response.data.address.street)
                setnumberText(response.data.address.number)
                setsubNumberText(response.data.address.subnumber)
                console.log(response.data)
            }catch{
                
            }
        }
        fetchData()
    }, [])
    const handleSubmit=async(e)=>{
        //props.setLoggedIn(true)
        e.preventDefault()
        let ll = descriptionText
        let addressID = null
        let isOK = true;
        console.log(`Subnumber ${subNumberText}`)
        if(streetText != '' && numberText !=0){
            try{
                const addressResponse = await axios.post('/address/add',{
                    city: cityText,
                    street : streetText,
                    number : numberText,
                    subnumber : subNumberText
                })
                addressID = addressResponse.data.addressid
            }
            catch(error){
                console.log('error')
                isOK = false;
            }
        }
        console.log(`AddressID: ${addressID}  UserID: ${props.userId}  EventID: ${props.eventId}`)
        const bodyWithAddress = {
            description:descriptionText,
            eventtype:typeText,
            address : {
                addressid : addressID
            },
            creator:{
                personid: props.userId,
            }
        }
        const bodyWithoutAddress = {
            eventid:props.id,
            description:descriptionText,
            eventtype:typeText,
            creator:{
                personid: props.userId,
            }
        }
        if(isOK){
            const response = await axios.put('/event/update/' + props.eventId,bodyWithAddress)
        }
        else{
            const response = await axios.put('/event/update/' + props.eventId,bodyWithoutAddress)
        }

    }
    return (
        <div className='formContainer'>
    <div className='formName'>
        <p><b>New Event</b></p>
    </div>
        <form noValidate onSubmit={handleSubmit}>
            <input className = "appearance-none border-gray-300" type="text" onChange={(e)=>{setdescriptionText(e.target.value)}} placeholder="Description" value={descriptionText}></input><br></br>
            <input type="text" onChange={(e)=>{settypeText(e.target.value)}} placeholder="Event type" value={typeText}></input><br></br>
            <input type="text" onChange={(e)=>{setcityText(e.target.value)}} placeholder="City" value={cityText}></input><br></br>
            <input type="text" onChange={(e)=>{setstreetText(e.target.value)}} placeholder="Street" value={streetText}></input><br></br>
            <input type="text" onChange={(e)=>{setnumberText(e.target.value)}} placeholder="Number" value={numberText}></input><br></br>
            <input type="text" onChange={(e)=>{setsubNumberText(e.target.value)}} placeholder="SubNumber" value={subNumberText}></input><br></br>
            <input className='submitBtn' type="submit" value="Zapisz"></input><br></br>
        </form>
     <div>{errorText}</div>
 </div>
    )
}
const mapStateToProps = state => {
    console.log(state)
    return {
        userId : state.auth.userId
    }
}

export default connect(mapStateToProps)(EventForm)