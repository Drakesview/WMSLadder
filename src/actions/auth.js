import {firebase} from '../firebase/firebase';

export const login = ({uid,emailVerified}) => ({
    type:'LOGIN',
    uid,
    emailVerified
})

export const startLogin = (email,password) => {
    return () => {
        return firebase.auth().signInWithEmailAndPassword(email,password)
    }
}

export const startCreateUser = (email, password) => {
    return (dispatch) => {
        return firebase.auth().createUserWithEmailAndPassword(email,password)
    } 
}

export const startSendEmailVerification = () => {
    return () => {
        return firebase.auth().currentUser.sendEmailVerification().then(() => {
            //email sent
        }).catch((e) => {
            console.log(e)
        })
    }
}

export const startEmailReset = (email) => {
    return () => {
        return firebase.auth().sendPasswordResetEmail(email).then()
    }
}

export const logout = () => ({
    type:'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    };
};