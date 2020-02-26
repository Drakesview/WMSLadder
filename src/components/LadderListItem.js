import React from 'react';
import { Link } from 'react-router-dom';



const LadderListItem = ({ id , name, pos, gamesWon, gamesLost, gamesPlayed }) => (
    <Link className="ladder-item" to={'/profile/'+id}>
        <div className="ladder-header__container">
            <div className="ladder-header__container">
                <h3 className="ladder-item__title"> {pos}</h3>
            </div>
            <div className="ladder-header__container">
                {pos === 1 ?  <h3 className="ladder-item__title"> <span>
                <img className="winningLogo" src="/images/Crown.png"></img>
                </span> {name}</h3>: 
                <h3 className="ladder-item__title">{name}</h3>
                }
            </div>
        </div>
        <div className="ladder-header__container">
            <h3 className="ladder-item__title show-for-desktop">{gamesPlayed}</h3>
            <h3 className="ladder-item__title show-for-desktop">{gamesWon}</h3>
            <h3 className="ladder-item__title show-for-desktop">{gamesLost}</h3>
        </div>
    </Link>
)

export default LadderListItem