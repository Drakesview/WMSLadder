import React from 'react';

const UpcomingGamesPage = ({player1Name, player2Name, datePlayed}) => (
    <div>
        <p>{player1Name} vs {player2Name}</p>
        <p>On {datePlayed}</p>
    </div>
)

export default UpcomingGamesPage