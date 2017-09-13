import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import reducer from './reducers';
import {logUser} from './actions';
import App from './components/App';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import {Router, Route} from 'react-router-dom';
import {firebaseApp} from './firebase';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const store = createStore(reducer);

	firebaseApp.auth().onAuthStateChanged(user => {
		if (user) {
			
			// console.log('user has signed in or up', user);
			const {email}  = user;
			store.dispatch(logUser(email));
			history.push("/app");
			// history.push('/app');
		} else {
			// console.log('no user');
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