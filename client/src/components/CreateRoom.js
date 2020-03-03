import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../store/roomReducer'

const CreateRoom = ({ createRoom }) => {
    
    const [roomName, setroomName] = useState('')

    const submitForm = e => {
        e.preventDefault()
        createRoom({name: roomName})
        setroomName('')

    }

    return (
        <div>
            <h4>Create Room</h4>
            <form className='form' onSubmit={submitForm} >
                <input
                    onChange={ e => setroomName(e.target.value)}
                    value={roomName}
                    name="roomName"
                    placeholder='room name'
                    required
                    />
                    <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(null, mapDispatchToProps)(CreateRoom)