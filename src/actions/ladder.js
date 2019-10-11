export const getLadder = (userData) => ({
        type:'GET_LADDER',
        userData
    })


export const addUserToLadder = (user) => ({
    type:'ADD_TO_LADDER',
    user
})