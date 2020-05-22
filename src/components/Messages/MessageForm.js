import React, {useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

const MessageForm = (props) => {
    const [subject, setSubjectText] = useState('')
    const [body, setBodyText] = useState('')


    const handleSubmit=async(e)=>{
        e.preventDefault()
  
        const message = {
            messageid:666, //IDENTITY TO DO
            sender:{
                personid:props.senderid},
            receiver:{
                personid:props.receiverid},
            subject:subject,
            body:body,
            senton:new Date()
        }
        const response = await axios.post('/message/send/',message)
    }



    return (
        <div className='formContainer'>
    <div className='formName'>
        <p className="optionTitle">Wyślij wiadomość</p>
    </div>
        <form noValidate onSubmit={handleSubmit}>
            <p className="my-1"><label className="ml-4 my-4 font-bold text-base">Temat</label></p>
            <input className="ml-4 px-2 text-2xl rounded-lg border border-blue-600" type="text" onChange={(e)=>{setSubjectText(e.target.value)}} placeholder="Temat" value={subject}></input><br></br>
            <p className="my-1"><label className="ml-4 font-bold text-base">Treść</label></p>
            <textarea className="ml-4 px-2 text-2xl rounded-lg border border-blue-600 w-auto" type="text" cols="40" rows="5" onChange={(e)=>{setBodyText(e.target.value)}} placeholder="..." value={body}></textarea><br></br>
            <input className='submitBtn' type="submit" value="Wyślij"></input><br></br>
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