import React, { PropTypes } from 'react';
import Header from './common/Header';
import {Route} from "react-router";
import InstanceContainer from "./InstanceContainer"
import IndexContainer from "./IndexContainer";

function App({ children }) {
    return (
        <div className="app">
            <Header />
            <Route exact path="/" component={IndexContainer} />
            <Route path="/:workflow_id/:instance_id" component={InstanceContainer}/>
        </div>
    );
}

App.propTypes = { children: PropTypes.object };

export default App;
