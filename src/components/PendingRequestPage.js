import { connect } from 'react-redux'
import React from 'react';
import moment from 'moment';

const PendingRequestPage = ({player1Name, player2Name, datePlayed, player1Id, Player1,id}) => (
    <div>
    <p>{id}</p>
        <p>{player1Name} vs {player2Name}</p>
        <p>On {moment(datePlayed).format('Do MMMM YYYY')}</p>
        {Player1 === player1Id ? <button disabled>Pending</button>: <button onClick={() => {alert(`${id}`)}}>Accept Game</button>}
        
    </div>
)


export default PendingRequestPage