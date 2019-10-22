import React, {useState} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import LadderPage from './LadderPage';
import NotFoundPage from './NotFoundPage';
import TabContainer from 'react-bootstrap/TabContainer';

const ControlledTabs = () => {
    const [key, setKey] = useState('home');
    return (
    <div>
    <div>
        <h3>Hello user</h3>
    </div>
    <div>
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
        <Tab eventKey="home" title="Home">
          <LadderPage />
        </Tab>
        <Tab eventKey="profile" title="Match Details">
          <NotFoundPage />
        </Tab>
      </Tabs>
      </div>
    </div>
    );
  }
  
  export default ControlledTabs