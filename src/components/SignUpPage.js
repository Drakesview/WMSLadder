import React from 'react'
import {connect} from 'react-redux'
import validator from 'validator'
import {startCreateUser, startSendEmailVerification} from '../actions/auth'
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
    backButton = () => {
        this.props.history.goBack();
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
                            this.props.startCreateUser(state.email,state.password).then((data) => {
                                const firstName = state.firstName.charAt(0).toUpperCase() + state.firstName.slice(1).toLowerCase()
                                const lastName = state.lastName.charAt(0).toUpperCase() + state.lastName.slice(1).toLowerCase() 
                                const name = `${firstName} ${lastName}`
                                console.log(firstName, lastName)
                                this.props.startAddUserToLadder({
                                    id:data.user.uid,
                                    name,
                                    email:state.email,
                                    gamesPlayed:0,
                                    gamesWon:0,
                                    gamesLost:0
                                }).then(() => {
                                    this.props.startSendEmailVerification()
                                })
                            }).catch((e) => {
                                this.setState(() => ({error:e.message}))
                            })
                            
                            
                            
                        } else {
                            this.setState(() => ({error:'Passwords must match'}))
                        }
                    } else {
                        this.setState(() => ({error:'Password must be atleast 8 characters and contain atleast one number and one letter'}))
                        }
                } else {
                    this.setState(() => ({error:'Email addresses must match'}))
                }
            } else {
                this.setState(() => ({error:'Ladder is for WMS/Captia employees only please enter a WMS or Capita email'}))

            }
        } else {
            this.setState(() => ({error:'Please enter a valid email address'}))
        }
        
    }
    render () {
        return (
            <div className="box-layout">
            <div className="box-layout__box">
            <form onSubmit={this.onSubmit} className="form">
            <h1 className="box-layout__title">WMS Squash Ladder</h1>
            {this.state.error && <p>{this.state.error}</p>}
                <input
                    type="text"
                    className="text-input"
                    placeholder="First Name"
                    autoFocus
                    value = {this.state.firstName}
                    onChange={this.onFirstNameChange}
                    />
                <input
                    type="text"
                    className="text-input"
                    placeholder="Last Name"
                    value = {this.state.lastName}
                    onChange={this.onLastNameChange}
                    />
                <input
                    type="text"
                    className="text-input"
                    placeholder="Email Address"
                    value = {this.state.email}
                    onChange={this.onEmailChange}
                    />
                <input
                    type="text"
                    className="text-input"
                    placeholder="Confirm Email Address"
                    value = {this.state.confirmEmail}
                    onChange={this.onConfirmEmailChange}
                    />
                <input
                    type="password"
                    className="text-input"
                    placeholder="Password"
                    value = {this.state.password}
                    onChange={this.onPasswordChange}
                    />
                <input
                    type="password"
                    className="text-input"
                    placeholder="Confirm Password"
                    value = {this.state.confirmPassword}
                    onChange={this.onConfirmPasswordChange}
                    />
                <button className="button-layout">Sign Up</button>
                
            </form>
                <button onClick={this.backButton} className="button-layout button-layout--secondary">Back</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startCreateUser: (email, password) => dispatch(startCreateUser(email, password)),
        startAddUserToLadder: (userData) => dispatch(startAddUserToLadder(userData)),
        startSendEmailVerification: () => dispatch(startSendEmailVerification())
    }
}

export default connect(undefined, mapDispatchToProps)(SignUpPage)
