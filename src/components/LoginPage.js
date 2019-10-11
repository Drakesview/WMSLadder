import React from 'react';
import { connect } from 'react-redux';


export const LoginPage = () => (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Full Name"
                    ></input>
            </form>
        </div>
    );

const mapDispatchToProps = (dispatch) => ({

});

export default connect(undefined,mapDispatchToProps)(LoginPage);
