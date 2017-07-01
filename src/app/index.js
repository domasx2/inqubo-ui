import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import reducers from './reducers';
import { describeWorkflow, processEvent } from './actions';

import './components/bundle.scss';
import 'semantic-ui-css/semantic.min.css'

import App from './components/App';

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider> , document.getElementById('react-root'));

const socket = io.connect(window.location.protocol + '//' + window.location.host);
socket.on('workflow', workflow => store.dispatch(describeWorkflow(workflow)))
socket.on('workflow_event', event => store.dispatch(processEvent(event)))
