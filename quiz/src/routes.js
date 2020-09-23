import React from 'react'
import { Route, IndexRoute, BrowserRouter, Switch } from 'react-router-dom'

import App from './containers/App'
import About from './components/About'
import Quiz from './containers/Quiz'
import Create from './containers/Create'
import Leaderboard from './components/Leaderboard'
import PassportAuth from './containers/PassportAuth'

export default (
	<BrowserRouter>
	<Switch>
  <Route name = 'home' component = {App}>
  	<Route path = '/' name = 'about' component = {About} />
  	<Route path = 'quiz' name = 'quiz' component = {Quiz} />
  	<Route path = 'create' name = 'create' component = {Create} />
  	<Route path = 'leaderboard' name = 'leaderboard' component = {Leaderboard} />
  	<Route path = 'account' name = 'account' component = {PassportAuth} />
  </Route>
  </Switch>
  </BrowserRouter>
);