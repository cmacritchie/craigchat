import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../store/roomReducer'

const MessageEntry = ({ roomId, postMessage}) => {
    const [message, setmessage] = useState('')

    const submitForm = e =>{
        e.preventDefault()
        postMessage({text:message, room:roomId})   
        setmessage('')
    }

    return (
        
    <form className='form' id='chatEntry' onSubmit={submitForm} >
        <input
            onChange={(e)=>setmessage(e.target.value)}
            value = {message} 
            name="message"
            placeholder="text here"
            required
            />
            <input type="submit" className="btn btn-primary" value="Submit"/>
    </form>
        
    )
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(null, mapDispatchToProps)(MessageEntry)