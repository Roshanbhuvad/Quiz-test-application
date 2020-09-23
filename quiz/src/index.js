import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history'
import { Route, Switch, } from 'react-router-dom'
import { Provider } from 'react-redux'
import {Router,browserHistory} from "react-router"
import routes from './routes'
import thunkMiddleware from 'redux-thunk'
import configureStore from './store/configureStore'

import './theme/bootstrap-social.css'
import './theme/index.scss'

export const store = configureStore();

ReactDOM.render(
  <Provider store = {store}>
    <Router history = {browserHistory} routes = {routes} />
  </Provider>,
  document.getElementById('app')
);