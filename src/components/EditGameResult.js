import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {SingleDatePicker} from 'react-dates'
import {startUpdateLadder} from '../actions/ladder'
import {recordGameScore} from '../actions/matches'

const now = moment()

export class EditGameResult extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            player1:props.matches ? props.matches.player1Name: '',
            player2:props.matches ? props.matches.player2Name: '',
            winningPos:0,
            losingPos:0,
            player1Score:0,
            player2Score:0,
            error:'',
            player1CurrentIndex:props.matches ? props.players.findIndex((player) => {
                return player.name === props.matches.player1Name                    
            }) : -1,
            player2CurrentIndex:props.matches ? props.players.findIndex((player) => {
                return player.name === props.matches.player2Name}) : -3,
            affectedPlayers:[]
        }
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
    onSubmit = (e) => {
        e.preventDefault()
        const propPlayers = this.props.players
        const statePlayers = this.state
        if (this.state.player2 === '') {
             this.setState(() => ({error:'Please select an opponent'}))
        } else {
            const winningPlayerIndex = this.winningPlayer(statePlayers.player1Score,statePlayers.player2Score)
            const losingPlayerIndex = this.losingPlayer(statePlayers.player1Score,statePlayers.player2Score)
            const winner = this.props.players[winningPlayerIndex]
            const loser = this.props.players[losingPlayerIndex]
            const affectedPlayers=[]
            if(losingPlayerIndex !== -1 && winningPlayerIndex !== -1) {
                if (losingPlayerIndex > winningPlayerIndex) {
                    //update winning and losing players game
                    //update the props.match details with score
                        //update the stage

                    winner.gamesWon += 1
                    winner.gamesPlayed += 1
                    loser.gamesLost += 1
                    loser.gamesPlayed += 1

                    affectedPlayers.push(winner)
                    affectedPlayers.push(loser)

                } else {

                    //find all players inbetween the winner and loser as they would
                    //need a new pos to be pos + 1 
                    const middlePlayers = propPlayers.filter((player,index) => {
                        return index > losingPlayerIndex && index < winningPlayerIndex
                    })
                    const newPos =middlePlayers.map((player) => {
                        return {...player,
                                pos:player.pos + 1}
                    })

                    newPos.forEach((player) => {
                        affectedPlayers.push(player)
                    })
                    winner.pos = losingPlayerIndex + 1
                    winner.gamesWon += 1
                    winner.gamesPlayed += 1
                    loser.pos = losingPlayerIndex + 2
                    loser.gamesLost += 1
                    loser.gamesPlayed += 1

                    affectedPlayers.push(winner)
                    affectedPlayers.push(loser)
                    
                   

                }
                //Call a update for each item in the affected players array to update each player
                //call update for the match details.
                //this.props.history.push('/')

                affectedPlayers.forEach((player) => {
                    this.props.startUpdateLadder(player)
                })

                this.props.recordGameScore({
                    id:this.props.matches.id,
                    LosingPlayer:loser.name,
                    WinningPlayer:winner.name,
                    Player1Score: this.state.player1Score,
                    Player2Score:this.state.player2Score,

                })
                this.props.history.push('/')

            } else {
                this.setState(() => ({error:'Games can not be a draw as they are a best of 5 please try again'}))
            }
        }
    }
    goBack = () => {
        this.props.history.goBack()
    }

    componentDidMount () {
        if (!this.props.matches) {
            this.props.history.goBack()
        }
    }
    render() {
    return this.props.matches ?  (
        <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Record result</h1>
            </div>
        </div>
        <div className="content-container">
            <form onSubmit={this.onSubmit} className="form">
            {this.state.error && <p className="form__error">{this.state.error}</p>}
                <h3>{this.state.player1}</h3>
                <input
                autoFocus
                className="text-input"
                placeholder="Player 1 Score"
                value={this.state.player1Score}
                type="number"
                onChange={this.onPlayer1ScoreChange}
                ></input>
                <h3>{this.state.player2}</h3>
                <input
                className="text-input"
                placeholder="Player 2 score" 
                value={this.state.player2Score}
                type="number"
                onChange={this.onPlayer2ScoreChange}
                />
                <div>
            <button className="button-layout">Save Result</button>
            </div>
            </form>
            <button className="form button-layout button-layout--secondary" onClick={this.goBack} >Cancel</button>
        </div>
        </div>

        
        )
        : (
            
            <div>
            
            <p>No game found please go back to profile</p></div>
        )
    }
}

const mapStateToProps = (state,props) => {
    return {
        matches:state.matches.find((match) => match.id === props.match.params.id),
        players:state.ladder
    }
}

const mapDispatchToPropbs = (dispatch) => {
    return {
        recordGameScore: (matchData) => dispatch(recordGameScore(matchData)),
        startUpdateLadder: (player) => dispatch(startUpdateLadder(player))
    }
}


export default connect(mapStateToProps,mapDispatchToPropbs)(EditGameResult)
