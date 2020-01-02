import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, {history} from './routers/AppRouter'
import configureStore from './store/configureStore'
import {login, logout} from './actions/auth'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap.min.css';
import {firebase}  from './firebase/firebase'
import LoadingPage from './components/LoadingPage'
import {startGetLadder} from './actions/ladder'
import {startGetMatches} from './actions/matches'
import database  from './firebase/firebase'

// database.collection("matches").add({
//   id:1,
//   Player1:'qGWfPY15QHO3wsFcKPi42XjAkcB2',
//   Player2:'1234dede', 
//   stage:1,
//   datePlayed:0,
//   Player1Score:0,
//   Player2Score:0,
//   WinningPlayer:'',
//   LosingPlayer:''
//   })
//   .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(function(error) {
//     console.log("Error adding document: ", error);
//   });

//   database.collection("matches").add({
//     id:2,
//     Player1:'qGWfPY15QHO3wsFcKPi42XjAkcB2',
//     Player2:'1234dede', 
//     stage:3,
//     datePlayed:20191212,
//     Player1Score:3,
//     Player2Score:1,
//     WinningPlayer:'qGWfPY15QHO3wsFcKPi42XjAkcB2',
//     LosingPlayer:'1234dede'
//     })
//     .then(function(docRef) {
//       console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function(error) {
//       console.log("Error adding document: ", error);
//     });

// database.collection("matches").where('Player2', '==', 'qGWfPY15QHO3wsFcKPi42XjAkcB2')
//     .get()
//     .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         matches.push({id:doc.id,
//                 ...doc.data()})
//     })
// })

// database.collection("users").orderBy('pos').get().then((querySnapshot) => {
//     const users = []
//     querySnapshot.forEach((doc) => {
//         users.push({
//             id:doc.id,
//             ...doc.data()
//         })
//         console.log(doc.id, '=>', doc.data())
//     })
//     console.log(users)
// })
// database.collection("users").where('middle', '==', 'shents').get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             console.log(doc.id, "=>", doc.data())
//         })
//     })
//     .catch((e) => {
//         console.log(`Error getting documents: ${e}`)
//     });

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

const store = configureStore();


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRendered = true;
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'))


firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        store.dispatch(login(user.uid))
        store.dispatch(startGetLadder()).then(() => {
            renderApp();
            if(history.location.pathname === '/') {
               history.push('/dashboard'); 
            }
        });
    } else {
        store.dispatch(logout())
        renderApp();
        history.push('/');
    }
});

