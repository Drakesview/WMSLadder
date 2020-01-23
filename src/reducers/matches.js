export default (state = [], action) => {
    switch(action.type) {
        case 'GET_MATCHES':
        return action.matchData
        case 'ADD_MATCH':
            return [
                ...state,
                action.matchData
            ]
        case 'REMOVE_MATCH':
            return state.filter((match) => match.id !== action.id)
    default:
        return state 
    }

}