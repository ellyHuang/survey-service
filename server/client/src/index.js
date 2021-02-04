// the top-level index.js file is usually responsible for the initial redux setup

import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//testing sendgrid
import axios from 'axios';
window.axios = axios;

// make redux-thunk as a middleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store= {store} >
        <App />
    </Provider>,
    document.querySelector('#root')
);
