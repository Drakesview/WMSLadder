import React from 'react';
import {connect} from 'react-redux'
import LadderListItem from './LadderListItem'

export const LadderPage = (props) => 
    (<div>
        <h1>Ladder</h1>
        {props.ladder.map((player,index) => {
            return <LadderListItem
                key={player.id}
                {...player}
                index={index}
                />
        })}
    </div>
    )


const mapStateToProps = (state) => {
    return {
    ladder:state.ladder
    }
}


export default connect(mapStateToProps)(LadderPage)