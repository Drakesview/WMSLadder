import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';


export const Header = ({startLogout, id}) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
            <Link className="header__title" to={"/dashboard"} >
                <h1>Boilerplate</h1>
            </Link>
            <Link className="header__title" to={"/profile/"+id} >
                <h1>Profile</h1>
            </Link>
            <button className="button-layout button-layout--link" onClick={startLogout}>Logout</button> 
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})
const mapStateToProps = (state) => ({
    id:state.auth.uid
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);