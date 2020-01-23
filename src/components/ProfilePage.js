import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
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
      }).gamesLost,
        upcomingGames:this.props.matches.filter((el) => {
          return el.stage === 1
        })
      }
    }
    componentDidMount() {
      this.props.startGetMatches(this.props.match.params.id)
    }
    
    render() {
      const upcomingGamesCount = this.props.matches.filter((match) => {
        return match.stage === 1
      })
      const pendingGamesCount = this.props.matches.filter((match) => {
        return match.stage === 2
      })
      const myProfile = this.props.match.params.id === this.props.auth.uid
    return (
    <div>
      <div>
        <h3>{this.state.userName}'s Profile </h3>
      </div>
      <div>
      <h3>Upcoming Games</h3>
        {upcomingGamesCount.length > 0 ? 
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
      {myProfile &&
        <h3>Pending game requests</h3>
      }
        {myProfile && pendingGamesCount.length > 0 ? 
        this.props.matches.map((match) => {
          if (match.stage === 2) {
            return <PendingRequestPage 
              key = {match.id}
              player1Id = {this.props.match.params.id}
              {...match}
              
            />
          
        }})
   : 
       myProfile && <p>no matches found</p>
   }
   
      </div>
      {myProfile && <Link to="/create">Create Game Request</Link>}
    </div>
    );
  }
}
  
  const mapStateToProps = (state) => ({
    ladder:state.ladder,
    matches:state.matches,
    auth:state.auth
  })

  const mapDispatchToProps = (dispatch) => ({
    startGetMatches : (id) => dispatch(startGetMatches(id))
  })

  export default connect(mapStateToProps,mapDispatchToProps)(ControlledTabs)