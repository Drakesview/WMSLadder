import database from '../firebase/firebase'


export const addMatch = (matchData) => ({
    type:'ADD_MATCH',
    matchData
});

export const getMatches = (matchData) => ({
    type:'GET_MATCH',
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