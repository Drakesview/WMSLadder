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
                <div className="box-layout">
                <div className="box-layout__box">
                    <form onSubmit={this.onSubmit} className="form">
                    <h1 className="box-layout__title">WMS Squash Ladder</h1>
                    {this.state.error && <p>{this.state.error}</p>}
                        <input
                            type="text"
                            className="text-input"
                            placeholder="Enter email"
                            onChange={this.onEmailChange}
                            value={this.state.email}
                            />
                        <input
                            type="password"
                            className="text-input"
                            placeholder="Password"
                            value = {this.state.password}
                            onChange={this.onPasswordChange}
                            />
                        <button className="button-layout">Sign in</button>
                    </form>
                    <div>
                        <p>Not a member? <span><Link to="/signup">Sign up now!</Link></span></p>
                        <div>
                        <Link to="/forgottenPassword">Forgot password?</Link>
                        </div>
                    </div>
                    </div>
                </div>

        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    startLogin: (email, password) => (dispatch(startLogin(email,password)))
});

export default connect(undefined,mapDispatchToProps)(LoginPage);
