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
import {firebase} from './firebase/firebase'
import LoadingPage from './components/LoadingPage'
import {getLadder, addUserToLadder} from './actions/ladder'


const store = configureStore();

const playersData = 
[       {
        id:1,
        name:"Adam",
        email:'test123@123.com'
        },
        {
        id:2,
        name:"Dan",
        email:'test123@123.com'},
        {
        id:3,
        name:"Gray",
        email:'test123@123.com'},
        {
        id:4,
        name:"Gary",
        email:'test123@123.com'},
        {
        id:5,
        name:"Rides",
        email:'test123@123.com'},
        ]


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

store.dispatch(getLadder(playersData))

// store.dispatch(addUserToLadder({name:'Test',pos:10}))

ReactDOM.render(jsx, document.getElementById('app'))

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
//         if(history.location.pathname === '/') {
//            history.push('/dashboard'); 
//         }
//     } else {
//         store.dispatch(logout())
//         renderApp();
//         history.push('/');
//     }
// });
