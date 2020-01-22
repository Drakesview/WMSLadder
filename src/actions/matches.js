import database from '../firebase/firebase'


export const addMatch = (matchData) => ({
    type:'ADD_MATCH',
    matchData
});

export const acceptGameRequest = (id) => {
    return (dispatch) => {
        return database.collection("matches").doc(id).update({stage:1})
    }
}

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