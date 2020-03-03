import React from 'react'
import { connect } from 'react-redux'

const loginWrapper = (edit = false, LoginForm) => {
    
    return class extends React.Component {
    
        submitForm(entry){
            if(edit){
                console.log('edit form')
            } else {
                console.log('submit form');
            }
        }

        render(){
            return (
                <div>
                    {/* <LoginForm onSubmit={(entry)=> submitForm(entry)} /> */}
                    <LoginForm {...this.props}  />
                </div>
            )
        }
    }
}

export default loginWrapper

