import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {acceptGameRequest} from '../actions/matches'

export class PendingRequestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        //this.acceptGame = this.acceptGame.bind(this)
    }
acceptGame = () => {
this.props.acceptGameRequest(this.props.id)
console.log(this.props)
}
render() {
    return (    
    <div>
    <p>{this.props.id}</p>
        <p>{this.props.player1Name} vs {this.props.player2Name}</p>
        <p>On {moment(this.props.datePlayed).format('Do MMMM YYYY')}</p>
        {this.props.Player1 === this.props.player1Id ? <button disabled>Pending</button>: <button onClick={this.acceptGame}>Accept Game</button>}
        
    </div>
)
    }
}

const mapDispatchToProps = (dispatch) => ({
    acceptGameRequest : (id) => dispatch(acceptGameRequest(id))
})

export default connect(undefined, mapDispatchToProps)(PendingRequestPage)
