import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import config from '../helpers/headerConfig'
// import { store } from '../index'

const EmailEntry = ({ currentRoom, user}) => {
    const [email, setemail] = useState('')

    const submitForm = async e =>{
        e.preventDefault()
        
        const sendEmail = {
            inviter: user.user.name,
            receiver: email,
            room: currentRoom.name,
            id: currentRoom._id
        }
        const emailResponse = await axios.post(`/api/email`, sendEmail, config(user.token))
        console.log(emailResponse)
        setemail('')
    }

    return (
        <div>
            <form className='form' onSubmit={submitForm} >
            <input
                onChange={(e)=>setemail(e.target.value)}
                value = {email}
                type="email" 
                name="email"
                placeholder="email chat room to friend"
                required
                />
                <input type="submit" className="btn btn-primary" value="Submit"/>
            </form>
        </div>
    )
}

const mapStateTopProps = ({ user }) =>{
    return { user }
} 


export default connect(mapStateTopProps)(EmailEntry)