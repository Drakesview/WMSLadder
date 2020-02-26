import React from 'react';
import {connect} from 'react-redux'
import LadderListItem from './LadderListItem'

export const LadderPage = (props) => 
    (<div className="content-container">
        <h1 className="ladder-header__title">WMS Ladder 2020</h1>
        <div className="ladder-header">
         <div className="ladder-header__container">
            <div className="show-for-mobile">Ladder</div>
            <div className="ladder-header__container">
            <div className="show-for-desktop">Position</div>
            </div>
            <div className="ladder-header__container">
            <div className="show-for-desktop">Player Name</div>
            </div>
        </div>
        <div className="ladder-header__container">
            <div className="show-for-desktop">Played</div>
            <div className="show-for-desktop">Won</div>
            <div className="show-for-desktop">Lost</div>
        </div>
        </div>        
        <div className="ladder-body">
        {props.ladder.map((player,index) => {
            return <LadderListItem
                key={player.id}
                {...player}
                index={index}
                />
        })}
    </div>
    </div>
    // (
    //     <table>
    //         <tr>
    //             <th>Position</th>
    //             <th>Player Name</th>
    //             <th></th>
    //             <th></th>
    //             <th></th>
    //         </tr>
        
    //     </table>

    )


const mapStateToProps = (state) => {
    return {
    ladder:state.ladder
    }
}


export default connect(mapStateToProps)(LadderPage)