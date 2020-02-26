import React from 'react';
import {connect} from 'react-redux';
import validator from 'validator';
import { startEmailReset } from '../actions/auth'

export class ForgottenPasswordPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            error:''
        }
    }
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({email}))
    }
    backButton = () => {
        this.props.history.goBack();
    }
    onSubmit = (e) => {
        e.preventDefault()
        if (validator.isEmail(this.state.email)) {
            this.props.startEmailReset(this.state.email)
            this.props.history.push('/')
        }  else {
            this.setState(() => ({error:'Please enter a valid email address'}))
        }
    }
render () {
    return (
        <div className="box-layout">
        <div className="box-layout__box">
            <form onSubmit={this.onSubmit} className="form">
            <h1 className="box-layout__title">WMS Squash Ladder</h1>
            {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input 
                    type="text"
                    placeholder="Enter email address"
                    value={this.state.email}
                    onChange={this.onEmailChange}
                    className="text-input"
                />
                <button className="button-layout">Send Email</button>
            </form>
            <button onClick={this.backButton} className="button-layout button-layout--secondary">back</button> 
        </div>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startEmailReset: (email) => dispatch(startEmailReset(email)) 
    }
} 

export default connect(undefined,mapDispatchToProps)(ForgottenPasswordPage)