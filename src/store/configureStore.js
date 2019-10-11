import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import ladderReducer from '../reducers/ladder';
import matchReducer from '../reducers/matches';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

export default () => {
    const store = createStore(
        combineReducers({
            auth:authReducer,
            ladder:ladderReducer,
            matches:matchReducer
        }), composeEnhancers(applyMiddleware(thunk))
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store
}




