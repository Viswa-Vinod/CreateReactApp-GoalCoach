import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import {loadTeams, configureUserPresence, loadGoals, recordUser, store, setUserStatus} from './initializeApp';
import {firebaseApp} from './firebase';

import App from './components/App';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import {Router, Route} from 'react-router-dom';

 

const history = createHistory();

	loadTeams();

	
	firebaseApp.auth().onAuthStateChanged(user => {
		if (user) {

			console.log('logged in user: ', user.email);
			
			configureUserPresence(user);
			
			loadGoals();

			const {email}  = user;
			recordUser(email);
			history.push("/app");
			
		} else {
			// console.log('user signed out');
			setUserStatus("offline");
			history.replace('/signin');
		}

	});

	 


ReactDOM.render(				
				<Provider store={store} >
						<Router path="/" history={history}>
							<div>
								<Route path="/app" component={App} />
								<Route path="/signin" component={SignIn} />
								<Route path="/signup" component={SignUp} />
							</div>
						</Router>
				</Provider>				
				, document.getElementById('root')
)