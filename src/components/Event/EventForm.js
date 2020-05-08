import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import './eventCss/Event.css'

    
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
        <p className="optionTitle">Ogólne informacje o wydarzeniu</p>
    </div>
        <form noValidate onSubmit={handleSubmit}>
            <p className="my-1"><label className="ml-4 my-4 font-bold text-base">Rodzaj wydarzenia</label></p>
            <input className="ml-4 px-2 text-2xl rounded-lg border border-blue-600" type="text" onChange={(e)=>{settypeText(e.target.value)}} placeholder="Wpisz rodzaj wydarzenia" value={typeText}></input><br></br>
            <p className="my-1"><label className="ml-4 font-bold text-base">Miasto</label></p>
            <input className="ml-4 px-2 text-2xl rounded-lg border border-blue-600" type="text" onChange={(e)=>{setcityText(e.target.value)}} placeholder="Wpisz miasto" value={cityText}></input><br></br>
            <p className="my-1"><label className="ml-4 font-bold text-base">Ulica</label></p>
            <input className="ml-4 px-2 text-2xl rounded-lg border border-blue-600" type="text" onChange={(e)=>{setstreetText(e.target.value)}} placeholder="Wpisz ulicę" value={streetText}></input><br></br>
            <p className="my-1"><label className="ml-4 font-bold text-base">Numer</label></p>
            <input className="ml-4 px-2 text-2xl rounded-lg border border-blue-600" type="text" onChange={(e)=>{setnumberText(e.target.value)}} placeholder="Wpisz numer ulicy" value={numberText}></input><br></br>
            <p className="my-1"><label className="ml-4 font-bold text-base">Drugi numer</label></p>
            <input className="ml-4 px-2 text-2xl rounded-lg border border-blue-600" type="text" onChange={(e)=>{setsubNumberText(e.target.value)}} placeholder="Wpisz drugi numer ulicy" value={subNumberText}></input><br></br>
            <p className="my-1"><label className="ml-4 font-bold text-base">Opis</label></p>
            <textarea className="ml-4 px-2 text-2xl rounded-lg border border-blue-600 w-auto" type="text" cols="40" rows="5" onChange={(e)=>{setdescriptionText(e.target.value)}} placeholder="Opis wydarzenia..." value={descriptionText}></textarea><br></br>
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