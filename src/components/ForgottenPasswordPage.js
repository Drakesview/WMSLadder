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
        <div>
            <form onSubmit={this.onSubmit}>
            {this.state.error && <p>{this.state.error}</p>}
                <label>Email address</label>
                <input 
                    type="text"
                    placeholder="Enter email address"
                    value={this.state.email}
                    onChange={this.onEmailChange}
                />
                <button>Send Email</button>
            </form>
            <button>back</button> 
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