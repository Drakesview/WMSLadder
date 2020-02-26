import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {acceptGameRequest, startRejectMatch} from '../actions/matches'

export class PendingRequestPage extends React.Component {
acceptGame = () => {
this.props.acceptGameRequest(this.props.id, this.props.player1Id)

}
rejectGame = () => {
this.props.startRejectMatch(this.props.id)
}
render() {
    return (    
    <div>
        <p>{this.props.player1Name} vs {this.props.player2Name}</p>
        <p>On {moment(this.props.datePlayed).format('Do MMMM YYYY')} at {moment(this.props.datePlayed).format('h:mm a')}</p>
        {this.props.Player1 === this.props.player1Id ? <button disabled>Pending</button>: <button onClick={this.acceptGame}>Accept Game</button>}
        <button onClick={this.rejectGame}>{this.props.Player1 === this.props.player1Id ? "Cancel" : "Reject"}</button>
    </div>
)
    }
}

const mapDispatchToProps = (dispatch) => ({
    acceptGameRequest : (id, player1Id) => dispatch(acceptGameRequest(id, player1Id)),
    startRejectMatch : (id) => dispatch(startRejectMatch(id))
})

export default connect(undefined, mapDispatchToProps)(PendingRequestPage)
