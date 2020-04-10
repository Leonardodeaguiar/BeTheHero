import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import { isAuthenticated } from './config/auth';

export default function Routes() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Logon} />
				<Route path="/register" component={Register} />
				{isAuthenticated() ? (
					<Route path="/profile" component={Profile} />
				) : (
					<Route path="/404" render={<h1>Acho que um de nós não deveria estar aqui!</h1>} />
				)}
				{isAuthenticated() ? (
					<Route path="/incidents/new" component={NewIncident} />
				) : (
					<Route path="/404" render={<h1>Acho que um de nós não deveria estar aqui!</h1>} />
				)}
			</Switch>
		</Router>
	);
}
