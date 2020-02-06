import React from 'react';
import moment from 'moment';

export const CompletedGames = (props) => {
console.log(props)
return (
    <div>
        <div>
            {props.player1Name} {props.Player1Score}  
            {props.player1Name === props.WinningPlayer ? 
                <span> Winner</span> : <span> Loser</span>} 
        </div>
        vs
        <div>
            {props.player2Name} {props.Player2Score}
            {props.player2Name === props.WinningPlayer ? 
                <span> Winner</span> : <span> Loser</span>} 
        </div>
        <p>{moment(props.datePlayed).format('Do MMMM YYYY')}</p>
    </div>


)}

export default CompletedGames