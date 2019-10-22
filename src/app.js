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
import database  from './firebase/firebase'

// database.collection("users").add({
//     first: "Ada",
//     last: "Lovelace",
//     middle: "shents",
//     born: 1815
//   })
//   .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(function(error) {
//     console.log("Error adding document: ", error);
//   });

database.collection("users").orderBy('pos').get().then((querySnapshot) => {
    const users = []
    querySnapshot.forEach((doc) => {
        users.push({
            id:doc.id,
            ...doc.data()
        })
        console.log(doc.id, '=>', doc.data())
    })
    console.log(users)
})


database.collection("users").where('middle', '==', 'shents').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data())
        })
    })
    .catch((e) => {
        console.log(`Error getting documents: ${e}`)
    });

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

// const store = configureStore();


// const jsx = (
//     <Provider store={store}>
//         <AppRouter />
//     </Provider>
// );

// let hasRendered = false;
// const renderApp = () => {
//     if (!hasRendered) {
//         ReactDOM.render(jsx, document.getElementById('app'))
//         hasRendered = true;
//     }
// }

// ReactDOM.render(<LoadingPage />, document.getElementById('app'))


// firebase.auth().onAuthStateChanged((user) => {
//     if(user) {
//         store.dispatch(login(user.uid))
//         renderApp();
//             if(history.location.pathname === '/') {
//                history.push('/dashboard'); 
//             }
//         // store.dispatch(startGetLadder()).then(() => {
            
//         // });
//     } else {
//         store.dispatch(logout())
//         renderApp();
//         history.push('/');
//     }
// });

