import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import Error404 from './pages/404';
import { isAuthenticated } from './config/auth';

export default function Routes() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Logon} />
				<Route path="/register" component={Register} />
				<Route path="/404" component={Error404} />
				{isAuthenticated() ? (
					<Route path="/profile" component={Profile} />
				) : (
					<Redirect push to={{ pathname: '/404' }} />
				)}
				{isAuthenticated() ? (
					<Route path="/incidents/new" component={NewIncident} />
				) : (
					<Redirect push to={{ pathname: '/404' }} />
				)}
			</Switch>
		</Router>
	);
}
