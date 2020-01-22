import React from 'react';
import moment from 'moment';

export class UpcomingGamesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
render() {
    return (
        <div>
        <p>{this.props.player1Name} vs {this.props.player2Name}</p>
        <p>On {moment(this.props.datePlayed).format('Do MMMM YYYY')}</p>
    </div>
        )
    }
}
 


export default UpcomingGamesPage