import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {startGetMatches} from '../actions/matches';
import UpcomingGamesPage from './UpcomingGamesPage';
import PendingRequestPage from './PendingRequestPage';
import CompletedGames from './CompletedGames';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
      const completedGames = this.props.matches.filter((match) => {
        return match.stage === 3
      })
      const myProfile = this.props.match.params.id === this.props.auth.uid
    return (
    <div className="content-container">
      <div>
        <h3>{this.state.userName}'s Profile </h3>
      </div>
      <div>
      <Tabs>
        <TabList>
          <Tab>Upcoming Games</Tab>
          <Tab>Pending Requests</Tab>
          <Tab>Completed Games</Tab>
        </TabList>
      
        <TabPanel>
          {upcomingGamesCount.length > 0 ? 
            upcomingGamesCount.map((match) => {
              return <UpcomingGamesPage 
              key = {match.id}
              myProfile = {myProfile}
              {...match}
            />
          
            })
          : 
            <p>no matches found</p>
          }
        </TabPanel>
        <TabPanel>
          {myProfile && pendingGamesCount.length > 0 ? 
            pendingGamesCount.map((match) => {
              return <PendingRequestPage 
                key = {match.id}
                player1Id = {this.props.match.params.id}
                {...match}
                
              />
            
          })
         : 
            myProfile && <p>no matches found</p>
          }
        </TabPanel>
        <TabPanel>
          {completedGames.length > 0 ? 
            completedGames.map((match) => {
              return <CompletedGames 
                key = {match.id}
                {...match}
                
              />
            
          })
        : 
          <p>no matches found</p>
          }
        </TabPanel>
      </Tabs>        
      </div>
      <div>
       


   
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