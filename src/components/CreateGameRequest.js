import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {SingleDatePicker} from 'react-dates'
import {getLadder, startUpdateLadder} from '../actions/ladder'
import {startAddMatch} from '../actions/matches'
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
            player1Id:this.props.auth.uid,
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
        if (this.state.player2 === '') {
             this.setState(() => ({error:'Please select an opponent'}))
        } else {
            this.props.startAddMatch({
                player1Name:this.state.player1,
                Player1:this.props.auth.uid,
                Player1Score:0,
                player2Name:this.state.player2,
                Player2:this.props.players.find(obj => {
                    return obj.name === this.state.player2
                }).id,
                Player2Score:0,
                WinningPlayer:'',
                LosingPlayer:'',
                datePlayed:this.state.datePlayed.valueOf(),
                stage:2
            })
            this.props.history.goBack()
        }
    }

    render() {
    return (
        <div>
        <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">Create Game Request</h1>
        </div>
        </div>
        <div className="content-container">
        <form className="form" onSubmit = {this.onSubmit}>
            {this.state.error && <p className="form__error">{this.state.error}</p>}
            <div className="text-input">{this.state.player1}</div>
            <div className="text-header">Vs</div>
            <select className="text-input" name={this.state.player2} onChange={this.handleChange}>
                <option className="text-input" value=''>Pick Opponent</option>
                {this.props.players.map(({name,id}) => {
                    if(name !== this.state.player1){
                    return <option 
                            key ={id}
                            value={name}        
                    >{name}</option>
                }})}
            </select>
            <SingleDatePicker
                 date={this.state.datePlayed}
                 onDateChange={this.onDateChange}
                 focused={this.state.calendarFocused}
                 onFocusChange={this.onFocusChange}
                 numberOfMonths={1}
                 isOutsideRange={() => false}
                />
            <button className="button-layout">Send Game Request</button>
            </form>
            </div>
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
    startAddMatch: (matchData) => dispatch(startAddMatch(matchData)),
})

export default connect(mapStateToProps,mapDispatchToProps)(ResultsPage)
