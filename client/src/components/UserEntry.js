import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { actionCreators } from '../store/userReducer'

const UserEntry = ({ register, login, initialUser, registerUser }) => {

    const [user, setuser] = useState(initialUser || {})

    const handleChange = e => {
        setuser({...user, [e.target.name]:e.target.value })   
    }

    const submitForm = e =>{
        e.preventDefault()
        if (register) {
            console.log('register')
            registerUser(user) 
            
        } else {
            console.log('login')
            login(user)    
        }
    }

    return (
        <div>
            <form className='form' onSubmit={submitForm} >
            <input
                onChange={handleChange}
                value = {user.name}
                type = 'text'
                name='name'
                placeholder="name"
                required
                /> 
            <input
                onChange={handleChange}   
                value={user.password}
                type='password'
                name='password'
                placeholder="password"
                required
                /> 
            <input type="submit" className="btn btn-primary" value="Submit"/>
            </form>
        </div>
    )
}

UserEntry.defaultProps = {
    register:false,
    initialUser: {
        name:'',
        password:'',
    }
  };

const mapDispatchToProps = dispatch => bindActionCreators(
    actionCreators,
    dispatch
  )

export default connect(null, mapDispatchToProps)(UserEntry)
