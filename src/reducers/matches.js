export default (state = [], action) => {
    switch(action.type) {
        case 'GET_MATCHES':
        return action.userData
        case 'ADD_MATCH':
            return [
                ...state,
                action.matchData
            ]
    default:
        return state 
    }

}