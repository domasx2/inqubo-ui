import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/home/Home';
import reducers from './reducers';
import { describeWorkflow, processEvent } from './actions';

import './components/bundle.scss';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />;
      </Route>
    </Router>
  </Provider>
  , document.getElementById('react-root'));

const socket = io.connect(window.location.protocol + '//' + window.location.host);
socket.on('workflow', workflow => store.dispatch(describeWorkflow(workflow)))
socket.on('workflow_event', event => store.dispatch(processEvent(event)))
