import React from 'react';

const PendingRequestPage = ({player1Name, player2Name, datePlayed}) => (
    <div>
        <p>{player1Name} vs {player2Name}</p>
        <p>On {datePlayed}</p>
    </div>
)

export default PendingRequestPage