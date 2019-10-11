import React from 'react'
import {connect} from 'react-redux'

export class SignUpPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            confirmEmail:'',
            password:'',
            confirmPassword:''
        }
    }
    render () {
        return (
            <form>
                <input
                    type="text"
                    placeholder="First Name"
                    autoFocus
                    value = {this.state.firstName}
                    onChange={this.onFirstNameChange}
                    />
                <input
                    type="text"
                    placeholder="Last Name"
                    autoFocus
                    value = {this.state.lastName}
                    onChange={this.onLastNameChange}
                    />
                <input
                    type="text"
                    placeholder="Email Address"
                    autoFocus
                    value = {this.state.email}
                    onChange={this.onEmailChange}
                    />
                <input
                    type="text"
                    placeholder="Confirm Email Address"
                    autoFocus
                    value = {this.state.confirmEmail}
                    onChange={this.onConfirmEmailChange}
                    />
            </form>
        )
    }
}
