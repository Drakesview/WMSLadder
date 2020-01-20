import React, {useState} from 'react';
import {connect} from 'react-redux';
import {startGetMatches} from '../actions/matches'
import UpcomingGamesPage from './UpcomingGamesPage'
import PendingRequestPage from './PendingRequestPage'

export class ControlledTabs extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        userName:this.props.ladder.find(obj => {
          return obj.id === this.props.match.params.id
      }).name,
        gamesPlayed:this.props.ladder.find(obj => {
          return obj.id === this.props.match.params.id
      }).gamesPlayed,
        gamesWon:this.props.ladder.find(obj => {
          return obj.id === this.props.match.params.id
      }).gamesWon,
        gamesLost:this.props.ladder.find(obj => {
          return obj.id === this.props.match.params.id
      }).gamesLost
      }
    }

    componentDidMount() {
      this.props.startGetMatches(this.props.match.params.id)
    }
    
    render() {
    return (
    <div>
      <h3>Hello {this.state.userName} </h3>
      <p>you have won {this.state.gamesWon}</p>
      <div>
      <h3>Upcoming Games</h3>
        {this.props.matches.length > 0 ? 
         this.props.matches.map((match) => {
           if (match.stage === 1) {
             return <UpcomingGamesPage 
               key = {match.id}
               {...match}
             />
           
         }})
    : 
        <p>no matches found</p>
    }
      </div>
      <div>
      <h3>Pending game requests</h3>
      {this.props.matches.length > 0 ? 
        this.props.matches.map((match) => {
          if (match.stage === 2) {
            return <PendingRequestPage 
              key = {match.id}
              {...match}
            />
          
        }})
   : 
       <p>no matches found</p>
   }
      </div>
    </div>
    );
  }
}
  
  const mapStateToProps = (state) => ({
    ladder:state.ladder,
    matches:state.matches
  })

  const mapDispatchToProps = (dispatch) => ({
    startGetMatches : (id) => dispatch(startGetMatches(id))
  })

  export default connect(mapStateToProps,mapDispatchToProps)(ControlledTabs)