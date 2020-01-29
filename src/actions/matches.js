import database from '../firebase/firebase'

export const rejectMatch = (id) => ({
    type:'REMOVE_MATCH',
    id
}) 

export const startRejectMatch = (id) => {
    return (dispatch) => {
        return database.collection("matches").doc(id).delete()
        .then(() => {
            dispatch(rejectMatch(id))
        })
    }
}

export const addMatch = (matchData) => ({
    type:'ADD_MATCH',
    matchData
});

export const startAddMatch = (matchData) => {
    return (dispatch) => {
        return database.collection("matches").add(matchData).then((querySnapshot) => {
            database.collection("matches").doc(`${querySnapshot.id}`).set({
                id:querySnapshot.id,
                ...matchData
            })
        })
    }
}

export const getMatches = (matchData) => ({
    type:'GET_MATCHES',
    matchData
});

export const startGetMatches = (id) => {
    return (dispatch) => {
        return database.collection("matches").get().then((querySnapshot) => {
            const matches = []
            querySnapshot.forEach((doc) => {           
                if (doc.data().Player1 === id || doc.data().Player2 === id) {
                    matches.push({
                        id:doc.id,
                        ...doc.data()  
                    })  
                }
            })
            dispatch(getMatches(matches))
        })

    }
}

export const acceptGameRequest = (id, playerid) => {
    return (dispatch) => {
        return database.collection("matches").doc(id).update({stage:1}).then(() =>
        {
            dispatch(startGetMatches(playerid))
        })
    }
    
}

export const recordGameScore = ({id, LosingPlayer, WinningPlayer, Player1Score, Player2Score}) => {
    return (dispatch) => {
        return database.collection("matches").doc(id).update({
            LosingPlayer,
            WinningPlayer,
            Player1Score,
            Player2Score,
            stage:3
        })
    }
}
