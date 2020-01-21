import React from 'react';
import moment from 'moment';

const UpcomingGamesPage = ({player1Name, player2Name, datePlayed}) => (
    <div>
        <p>{player1Name} vs {player2Name}</p>
        <p>On {moment(datePlayed).format('Do MMMM YYYY')}</p>
    </div>
)

export default UpcomingGamesPage