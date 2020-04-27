import React, {useState} from 'react'
import axios from 'axios'   

    
const EventForm = (props) => {
    const [descriptionText, setdescriptionText] = useState('')
    const [typeText, settypeText] = useState('')
    const [cityText, setcityText] = useState('')
    const [streetText, setstreetText] = useState('')
    const [numberText, setnumberText] = useState(0)
    const [subNumberText, setsubNumberText] = useState(0)
    const [errorText, setErrorText] = useState('')

    const handleSubmit=async(e)=>{
        //props.setLoggedIn(true)
        e.preventDefault()
        let ll = descriptionText
        let addressID = null
        let isOK = true;
        console.log(`Subnumber ${subNumberText}`)
        if(streetText != '' && numberText !=0){
            try{
                const addressResponse = await axios.post('/address/address',{
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
        if(isOK){
            console.log(addressID)
            const response = await axios.post('/event/event',{
                description:descriptionText,
                eventtype:typeText,
                address : {
                    addressid : addressID
                },
                creator:{
                    personid: 2,
                }
            })
        }
        else{
            const response = await axios.post('/event/event',{
                description:descriptionText,
                eventtype:typeText,
                creator:{
                    personid: 2,
                }
            })
        }

    }
    return (
        <div className='formContainer'>
    <div className='formName'>
        <p><b>New Event</b></p>
    </div>
        <form noValidate onSubmit={handleSubmit}>
            <input className = "appearance-none border-gray-300" type="text" onChange={(e)=>{setdescriptionText(e.target.value)}} placeholder="Description"></input><br></br>
            <input type="text" onChange={(e)=>{settypeText(e.target.value)}} placeholder="Event type"></input><br></br>
            <input type="text" onChange={(e)=>{setcityText(e.target.value)}} placeholder="City"></input><br></br>
            <input type="text" onChange={(e)=>{setstreetText(e.target.value)}} placeholder="Street"></input><br></br>
            <input type="text" onChange={(e)=>{setnumberText(e.target.value)}} placeholder="Number"></input><br></br>
            <input type="text" onChange={(e)=>{setsubNumberText(e.target.value)}} placeholder="SubNumber"></input><br></br>
            <input className='submitBtn' type="submit" value="Utwórz"></input><br></br>
        </form>
     <div>{errorText}</div>
 </div>
    )
}

export default EventForm