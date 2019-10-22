import React from 'react';
import {Link} from 'react-router-dom'
import LadderPage from './LadderPage'
import Header from './Header'
const DashboardPage = () => (
    <div>
        <LadderPage/>
        <Link to="/results">Record a result</Link>
    </div>
);

export default DashboardPage