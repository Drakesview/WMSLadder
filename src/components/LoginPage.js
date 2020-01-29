import React from 'react';
import { connect } from 'react-redux';
import {startLogin} from '../actions/auth'
import { Link } from 'react-router-dom'

export class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            password:'',
            error:''
        }
    }
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({email}))
    }
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({password}))
    }
    onSubmit = (e) => {
        e.preventDefault()
        this.props.startLogin(this.state.email, this.state.password)
        .catch((e) => {
            this.setState(() => ({error:'Email or password is incorrect please try again'}))
        })
    }
    render() {
        return (     
                <div>
                    <form onSubmit={this.onSubmit}>
                    {this.state.error && <p>{this.state.error}</p>}
                        <input
                            type="text"
                            placeholder="Enter email"
                            onChange={this.onEmailChange}
                            value={this.state.email}
                            />
                        <input
                            type="password"
                            placeholder="Password"
                            value = {this.state.password}
                            onChange={this.onPasswordChange}
                            />
                        <button>Sign in</button>
                    </form>
                    <div>
                        <h3>Not a member? Sign up now!</h3>
                        <Link className="button-layout" to="/signup">Sign Up</Link>
                        <Link to="/forgottenPassword">Forgot password?</Link>
                    </div>
                </div>

        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    startLogin: (email, password) => (dispatch(startLogin(email,password)))
});

export default connect(undefined,mapDispatchToProps)(LoginPage);
