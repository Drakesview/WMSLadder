import React from 'react';
import {connect} from 'react-redux'
import LadderListItem from './LadderListItem'

export const LadderPage = (props) => 
    (<div className="content-container">
        <h1 className="ladder-header__title">WMS Ladder 2020</h1>
        <div className="ladder-header">
        <div className="show-for-desktop">Position</div>
        <div className="show-for-desktop">Player Name</div>
        <div className="show-for-mobile">Ladder</div>
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
    )


const mapStateToProps = (state) => {
    return {
    ladder:state.ladder
    }
}


export default connect(mapStateToProps)(LadderPage)