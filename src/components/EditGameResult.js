import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {SingleDatePicker} from 'react-dates'
import {getLadder, startUpdateLadder} from '../actions/ladder'
import {addMatch} from '../actions/matches'
import uuid from 'uuid'

const now = moment()

export class EditGameResult extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            player1:props.matches ? props.matches.player1Name: '',
            player2:props.matches ? props.matches.player2Name: '',
        }
    }

    componentDidMount () {
        if (!this.props.matches) {
            this.props.history.goBack()
        }
    }
    render() {
        console.log(this.props.history)
    return this.props.matches ?  (
        <div>
            <form>
            <div>
                <h3>Player 1</h3>
                <p>{this.state.player1}</p>
            </div>
            <div>
                <h3>Player 2</h3>
                <p>{this.state.player2}</p>
            </div>
            </form>
        
        </div>

        
        )
        : (
            
            <div>
            
            <p>No game found please go back to profile</p></div>
        )
    }
}

const mapStateToProps = (state,props) => {
    return {
        matches:state.matches.find((match) => match.id === props.match.params.id)
    }
}


export default connect(mapStateToProps)(EditGameResult)
