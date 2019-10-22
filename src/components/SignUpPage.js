import React from 'react'
import {connect} from 'react-redux'
import validator from 'validator'
import {startCreateUser} from '../actions/auth'
import {startAddUserToLadder} from '../actions/ladder'


export class SignUpPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            confirmEmail:'',
            password:'',
            confirmPassword:'',
            error:''
        }
    }
    onFirstNameChange = (e) => {
        const firstName = e.target.value;
        this.setState(() => ({firstName}))
    }
    onLastNameChange = (e) => {
        const lastName = e.target.value;
        this.setState(() => ({lastName}))
    }
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({email}))
    }
    onConfirmEmailChange = (e) => {
        const confirmEmail = e.target.value;
        this.setState(() => ({confirmEmail}))
    }
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({password}))
    }
    onConfirmPasswordChange = (e) => {
        const confirmPassword = e.target.value;
        this.setState(() => ({confirmPassword}))
    }
    onSubmit = (e) => {
        e.preventDefault()
        const state = this.state
        if (validator.isEmail(state.email)) {
            if(validator.contains(state.email, '@wmsl') || validator.contains(state.email, '@capita')) {
                if(state.email === state.confirmEmail) {
                    if (state.password && (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(state.password))) {
                        if(state.password === state.confirmPassword) {
                            this.setState(() => ({error:''}))
                            this.props.startCreateUser(state.email,state.password).then((user) => {
                                this.props.startAddUserToLadder({
                                    id:user.uid,
                                    name:`${state.firstName} ${state.lastName}`,
                                    email:state.email
                                })
                            }).catch((e) => {
                                this.setState(() => ({error:e.message}))
                            })
                            
                        } else {
                            this.setState(() => ({error:'Passwords must match'}))
                        }
                    } else {
                        this.setState(() => ({error:'Password must be atleast 8 characters and contain atleast 1 number and one letter'}))
                        }
                } else {
                    this.setState(() => ({error:'Email addresses must match'}))
                }
            } else {
                this.setState(() => ({error:'Ladder is for WMS/Captia employees only please enter a wms or capita email'}))

            }
        } else {
            this.setState(() => ({error:'Please enter a valid email address'}))
        }
        
    }
    render () {
        return (
            <form onSubmit={this.onSubmit}>
            {this.state.error && <p>{this.state.error}</p>}
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
                    value = {this.state.lastName}
                    onChange={this.onLastNameChange}
                    />
                <input
                    type="text"
                    placeholder="Email Address"
                    value = {this.state.email}
                    onChange={this.onEmailChange}
                    />
                <input
                    type="text"
                    placeholder="Confirm Email Address"
                    value = {this.state.confirmEmail}
                    onChange={this.onConfirmEmailChange}
                    />
                <input
                    type="password"
                    placeholder="Password"
                    value = {this.state.password}
                    onChange={this.onPasswordChange}
                    />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value = {this.state.confirmPassword}
                    onChange={this.onConfirmPasswordChange}
                    />
                <button>Sign Up</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startCreateUser: (email, password) => (dispatch(startCreateUser(email, password))),
        startAddUserToLadder: (userData) => dispatch(startAddUserToLadder(userData))
    }
}

export default connect(undefined, mapDispatchToProps)(SignUpPage)
