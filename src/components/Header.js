import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { startLogout, startSendEmailVerification } from '../actions/auth';


export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error:''
        }
    }
    sendEmail = (e) => {
        e.preventDefault()
        this.props.startSendEmailVerification()
    }

    render(){
    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                <Link className="header__title" to={"/dashboard"} >
                    <h1>WMS Squash Laddder</h1>
                </Link>
                <Link className="header__title" to={"/profile/"+this.props.id}>
                    <h1>Profile</h1>
                </Link>
                <button className="button-layout button-layout--link" onClick={this.props.startLogout}>Logout</button> 
                </div>
                {this.state.error && <p className="header__title">{this.state.error}</p>}
            </div>
            <div className="header__verifyEmail">
                <div className="verifyEmail__content">
                {!this.props.emailVerified && <p>Please verify email if you need another email please
                    <span>
                        <button className="button-layout button-layout--link button-layout--verif-link " onClick={this.sendEmail}>click here</button>
                    </span>
                    </p>}
                </div>
            </div>
        </header>
    )};
}


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    startSendEmailVerification: () => dispatch(startSendEmailVerification())
})
const mapStateToProps = (state) => ({
    id:state.auth.uid,
    emailVerified:state.auth.emailVerified
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);