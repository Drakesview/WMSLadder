import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {SingleDatePicker} from 'react-dates'
import {getLadder, startUpdateLadder} from '../actions/ladder'
import {addMatch} from '../actions/matches'
import uuid from 'uuid'

const now = moment()

export class ResultsPage extends React.Component{
    constructor(props) {
        super(props)
        this.state= {
            player1:this.props.players.find(obj => {
                return obj.id === this.props.auth.uid
            }).name,
            player2:'',
            winningPos:0,
            losingPos:0,
            player1Score:0,
            player2Score:0,
            datePlayed: moment(),
            calendarFocused:false,
            error:''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.setState({player2: e.target.value})
        // this.setState(() => ({player2:e.target.value}))
    }
    onPlayer1ScoreChange = (e) => {
        const score1 = e.target.value
            if (!score1 || /^\d?$/.test(score1)) {
                this.setState(() => ({player1Score:score1}))
            }
    }
    onPlayer2ScoreChange = (e) => {
        const score2 = e.target.value
            if (!score2 || /^\d?$/.test(score2)) {
                this.setState(() => ({player2Score:score2}))
            }
    }
    winningPlayer = (player1Score, player2Score) => {
        const propPlayers = this.props.players
        const statePlayers = this.state
        if (player1Score > player2Score) {
            return this.props.players.map((player) => {
                return player.name
            }).indexOf(this.state.player1)
        } else if (player1Score < player2Score) {
            return propPlayers.map((player) => {
                return player.name
            }).indexOf(statePlayers.player2)
        } else {
            return -1
        }
    }
    losingPlayer = (player1Score, player2Score) => {
        const propPlayers = this.props.players
        const statePlayers = this.state
        if (player1Score < player2Score) {
            return this.props.players.map((player) => {
                return player.name
            }).indexOf(this.state.player1)
        } else if (player1Score > player2Score) {
            return propPlayers.map((player) => {
                return player.name
            }).indexOf(statePlayers.player2)
        } else {
           return -1
        }
}
    onDateChange = (datePlayed) => {
        if(datePlayed) {
            this.setState(() => ({datePlayed}))
        }
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({calendarFocused:focused}))
    }
    onSubmit = (e) => {
        e.preventDefault()
        const propPlayers = this.props.players
        const statePlayers = this.state
        if (this.state.player2 === '') {
             this.setState(() => ({error:'Please select an opponent'}))
        } else {
            const winningPlayerIndex = this.winningPlayer(statePlayers.player1Score,statePlayers.player2Score)
            const losingPlayerIndex = this.losingPlayer(statePlayers.player1Score,statePlayers.player2Score)
            if(losingPlayerIndex !== -1 && winningPlayerIndex !== -1) {
                if (losingPlayerIndex > winningPlayerIndex) {
                    this.props.addMatch({
                        matchID:uuid,
                        winner:this.props.players[winningPlayerIndex].id,
                        loser:this.props.players[(losingPlayerIndex)].id,
                        datePlayed: this.state.datePlayed.valueOf()
                    })                   
                } else {
                    this.props.addMatch({
                        matchID:uuid,
                        winner:this.props.players[winningPlayerIndex].id,
                        loser:this.props.players[(losingPlayerIndex)].id,
                        datePlayed: this.state.datePlayed.valueOf()
                    })

                    // let newLadder = propPlayers 
                    // const winner = newLadder.slice(winningPlayerIndex,(winningPlayerIndex+1))
                    // newLadder.splice(winningPlayerIndex,1)
                    // newLadder.splice(losingPlayerIndex,0,winner[0])
                    // this.props.startUpdateLadder(newLadder)

                    

                }

                this.props.history.push('/')

            } else {
                this.setState(() => ({error:'Games can not be a draw as they are a best of 5 please try again'}))
            }
        }
    }

    render() {
    return (
        <div>
        <form onSubmit = {this.onSubmit}>
            <div>
            {this.state.error && <p>{this.state.error}</p>}
                <h3>Player 1</h3>
                {this.state.player1}
                <h3>Games won</h3>
                <input
                 value={this.state.player1Score}
                 type="number"
                 onChange={this.onPlayer1ScoreChange}
                 />
            </div>
        <div>
            <h3>Player 2</h3>
            <select name={this.state.player2} onChange={this.handleChange}>
                <option value=''>Pick Opponent</option>
                {this.props.players.map(({name,id}) => {
                    if(name !== this.state.player1){
                    return <option 
                            key ={id}
                            value={name}        
                    >{name}</option>
                }})}
            </select>
            <h3>Games won</h3>
            <input
                 value={this.state.player2Score}
                 type="number"
                 onChange={this.onPlayer2ScoreChange}
                 />
            <SingleDatePicker
                 date={this.state.datePlayed}
                 onDateChange={this.onDateChange}
                 focused={this.state.calendarFocused}
                 onFocusChange={this.onFocusChange}
                 numberOfMonths={1}
                 isOutsideRange={() => false}
                />
        </div>
            <button>Save Result</button>
            </form>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        players:state.ladder,
        auth:state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
    getLadder: (userData) => dispatch(getLadder(userData)),
    addMatch: (matchData) => dispatch(addMatch(matchData)),
    startUpdateLadder : (newLadder) => dispatch(startUpdateLadder(newLadder))
})

export default connect(mapStateToProps,mapDispatchToProps)(ResultsPage)
