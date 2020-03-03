import React from 'react'
import UserEntry from '../components/UserEntry'

const Register = () => {
    return (
        <div>
            <h1>Register Page</h1>
            <UserEntry register={true} />
        </div>
    )
}

export default Register