import React, {useState} from 'react';
import {connect} from 'react-redux';
import {startGetMatches} from '../actions/matches'

export class ControlledTabs extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        userName:this.props.ladder.find(obj => {
          return obj.id === this.props.match.params.id
      }).name,
        matches:[],
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
      this.setState({matches:this.props.startGetMatches(this.props.match.params.id)})
    }
    
    render() {
    return (
    <div>
      <h3>Hello {this.state.userName} </h3>
    </div>
    );
  }
}
  
  const mapStateToProps = (state) => ({
    ladder:state.ladder
  })

  const mapDispatchToProps = (dispatch) => ({
    startGetMatches : (id) => dispatch(startGetMatches(id))
  })

  export default connect(mapStateToProps,mapDispatchToProps)(ControlledTabs)