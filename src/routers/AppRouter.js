import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import LoginPage from '../components/LoginPage'
import DashboardPage from '../components/DashboardPage';
import LadderPage from '../components/LadderPage'
import ResultsPage from '../components/ResultsPage'
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute.js';
import PublicRoute  from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
    <div>
        <Switch>
        <PublicRoute path="/" component={DashboardPage} exact= {true} />
        <PublicRoute path="/ladder" component={LadderPage} />
        <PublicRoute path="/results" component={ResultsPage} />    
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
    </Router>
)

export default AppRouter;