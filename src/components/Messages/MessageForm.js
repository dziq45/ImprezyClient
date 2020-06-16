import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {apiCaller} from '../../apiCaller'


const MessageForm = (props) => {
    const [subject, setSubjectText] = useState('')
    const [body, setBodyText] = useState('')

    
    const handleSubmit=async(e)=>{
        e.preventDefault()
  
        const message = {
            sender:{
                personid:props.senderid},
            receiver:{
                personid:props.receiverid},
            subject:subject,
            body:body,
            senton:new Date()
        }
        const response = await apiCaller().post('/message/send/',message)
        hideForm()
        alert("Wysłano wiadomość.");
    }

    const hideForm = () =>{
        props.hide()
    }

    return(
        <div className='formContainer bg-gray-200'>
    <div className='formName'>
        <p className="text-2xl ml-4 my-4">Wyślij wiadomość</p>
    </div>
        <form noValidate onSubmit={handleSubmit}>
            <input className="mx-4 px-2 text-2xl rounded-lg border border-blue-600" type="text" onChange={(e)=>{setSubjectText(e.target.value)}} placeholder="Temat" value={subject}></input><br></br>
            <textarea className="mx-4 px-2 text-2xl rounded-lg border border-blue-600 w-auto" type="text" cols="40" rows="5" onChange={(e)=>{setBodyText(e.target.value)}} placeholder="Treść..." value={body}></textarea><br></br>
            <div>
            <input className='submitBtn inline-block' type="submit" value="Wyślij"></input>
            <button className='submitBtn inline-block' type='button' onClick={() =>hideForm()}>Anuluj</button>
            </div>
        </form>
       
        
 </div>
    )




}
const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
}
export default connect(mapStateToProps)(MessageForm)