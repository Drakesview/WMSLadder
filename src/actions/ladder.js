import database from '../firebase/firebase'

export const getLadder = (userData) => ({
        type:'GET_LADDER',
        userData
    })

export const startGetLadder = () => {
    return (dispatch) => {
        return database.ref('ladder/users')
        .once('value')
        .then((snapshot) => {
            const users = [];
            snapshot.forEach((childSnapshot) => {
                users.push({
                    id:childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(getLadder(users))
        });
    };
}

export const addUserToLadder = (user) => ({
    type:'ADD_TO_LADDER',
    user
})

export const startAddUserToLadder = (userData) => {
    return (dispatch,getState) => {
        const {
            id = 0,
            name='',
            email=''
        } = userData
        const user = {id, name, email}
        return database.ref(`ladder/users/`).push(user).then(() => {
            dispatch(addUserToLadder(user))
        })
    }
}

export const startUpdateLadder = (newLadder) => {
    return (dispatch) => {
        return database.ref('ladder/users/').set(newLadder).then(() => {
            dispatch(getLadder(newLadder))
        })
    }
}