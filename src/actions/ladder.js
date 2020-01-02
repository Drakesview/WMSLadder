import database from '../firebase/firebase'

export const getLadder = (userData) => ({
        type:'GET_LADDER',
        userData
    })    

export const startGetLadder = () => {
    return (dispatch) => {
        return database.collection("users").orderBy('pos').get().then((querySnapshot) => {
            const users = []
            querySnapshot.forEach((doc) => {
                users.push({
                    id:doc.id,
                    ...doc.data()
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

export const startAddUserToLadder = ({id,name,email,gamesPlayed,gamesWon,gamesLost}) => {
    return (dispatch,getState) => {
        return database.collection("users").orderBy("pos", "desc").limit(1).get().then((querySnapshot) => {
            const lastPos = []
            let lastPosition = 0 
            querySnapshot.forEach((doc) => {
                lastPos.push(doc.data())
            })
            lastPosition = lastPos.length > 0 ? lastPos[0].pos + 1 : 1
            return {id,
                  name,
                  email,
                  pos:lastPosition, 
                  gamesPlayed, 
                  gamesWon,
                  gamesLost}
        }).then((data) => {
            database.collection("users").add({
                    id:data.id,
                    name:data.name,
                    email:data.email,
                    pos:data.pos,
                    gamesPlayed:data.gamesPlayed,
                    gamesWon:data.gamesWon,
                    gamesLost:data.gamesLost
                  }).catch(function(error) {
                    console.log("Error adding document: ", error);
                  });
        }).then(() => {
            dispatch(startGetLadder())
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