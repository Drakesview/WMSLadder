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
    <Link to={'/match/'+this.props.id}>
        <div>
            <p>{this.props.player1Name} vs {this.props.player2Name}</p>
            <p>On {moment(this.props.datePlayed).format('Do MMMM YYYY')} at {moment(this.props.datePlayed).format('h:mm a')}</p>
        </div>
    </Link>
     : 
        <div>
            <p>{this.props.player1Name} vs {this.props.player2Name}</p>
            <p>On {moment(this.props.datePlayed).format('Do MMMM YYYY')} at {moment(this.props.datePlayed).format('h:mm a')}</p>
        </div>
    )
    }
}
 


export default UpcomingGamesPage