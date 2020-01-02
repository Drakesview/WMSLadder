import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import LoginPage from '../components/LoginPage'
import DashboardPage from '../components/DashboardPage';
import LadderPage from '../components/LadderPage'
import ResultsPage from '../components/ResultsPage'
import SignUpPage from '../components/SignUpPage'
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute.js';
import PublicRoute  from './PublicRoute';
import ControlledTabs from '../components/ProfilePage'

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
    <div>
        <Switch>
        <PublicRoute path="/" component={LoginPage} exact= {true} />
        <PublicRoute path="/signup" component={SignUpPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/results" component={ResultsPage} />    
        <PrivateRoute component={ControlledTabs} path="/profile/:id"/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
    </Router>
)

export default AppRouter;