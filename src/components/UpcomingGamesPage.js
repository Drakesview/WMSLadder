import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export class UpcomingGamesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
render() {
    return ( 
        
    this.props.myProfile ? 
    <div className="game-container">
    <Link to={'/match/'+this.props.id}>
            <p>{this.props.player1Name} vs {this.props.player2Name}</p>
            <p>On {moment(this.props.datePlayed).format('Do MMMM YYYY')} at {moment(this.props.datePlayed).format('h:mm a')}</p>
    </Link>
    <button className="button-layout button-layout--edit">Edit</button>
    </div>
     : 
        <div>
            <p>{this.props.player1Name} vs {this.props.player2Name}</p>
            <p>On {moment(this.props.datePlayed).format('Do MMMM YYYY')} at {moment(this.props.datePlayed).format('h:mm a')}</p>
        </div>
    )
    }
}
 


export default UpcomingGamesPage