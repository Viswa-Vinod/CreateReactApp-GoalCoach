	import {userRef, connectedRef, signedInUserRef, goalRef} from './firebase';
	import {createStore} from 'redux';
	import reducer from './reducers';
	import {logUser, setGoals, setTeams} from './actions';

	export const store = createStore(reducer);

	export const recordUser = (email) => {

		store.dispatch(logUser(email));
	} 

	let signedInUser = '';

	export const loadTeams = () => {
		userRef.on('value', snap => {
			// console.log('snap', snap.val());
			let teams = [];
			snap.forEach(user => {
				const {team} = user.val();
				
				if (teams.indexOf(team) < 0) teams.push(team);
			});
			
			store.dispatch(setTeams(teams));
			
		}, error => {console.log(error)})
	}

	export const loadGoals = () => {
		goalRef.on('value', snap => {
			let goals = [];
			snap.forEach(goal => {
				const {email, title, team} = goal.val();
				const serverKey = goal.key; //get the firebase assigned key of the goal
				goals.push({email, title, serverKey, team});
					
			})

			store.dispatch(setGoals(goals));
		})
	}

	export const configureUserPresence = (user) => {
			signedInUser = user.email;
		connectedRef.on("value", function(isOnline) {
	    	if (isOnline.val()) {
	      // If we lose our internet connection, we want ourselves removed from the list.
	      		signedInUserRef.onDisconnect().remove();

	      // Set our initial online status.
	      		setUserStatus("online");
	    	} else {

	      // We need to catch anytime we are marked as offline and then set the correct status. We
	      // could be marked as offline 1) on page load or 2) when we lose our internet connection
	      // temporarily.
	      		if (signedInUser!== '')	setUserStatus("offline");
	    	}
  		});
	}

	export const setUserStatus = (status) => {
		if (signedInUser!== '')	signedInUserRef.set({email: signedInUser, status});
	}

	