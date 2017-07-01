import React, { PropTypes } from 'react';
import Header from './common/Header';
import {Route} from "react-router";
import InstanceList from "./InstanceList";
import Instance from "./Instance";

function App({ children }) {
    return (
        <div className="app">
            <Header />
            <Route exact path="/" component={InstanceList} />
            <Route path="/:workflow_id/:instance_id" component={Instance}/>
        </div>
    );
}

App.propTypes = { children: PropTypes.object };

export default App;
