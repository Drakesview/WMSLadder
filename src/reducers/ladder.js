export default (state = [], action) => {
    switch(action.type) {
        case 'GET_LADDER':
        return action.userData
        case 'ADD_TO_LADDER':
            return [
                ...state,
                action.user
            ]
    default:
        return state 
    }

}