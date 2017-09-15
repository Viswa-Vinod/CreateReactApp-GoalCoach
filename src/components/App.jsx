import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setTeams} from '../actions';
import {firebaseApp, userRef} from '../firebase';
import AddGoal from './AddGoal';
import GoalList from './GoalList';
import CompleteGoalsList from './CompleteGoalsList';

class App extends Component {

	signOut() {
		firebaseApp.auth().signOut();
	}

	componentDidMount() {
		
		userRef.on('value', snap => {
			
			let teams = [];
			snap.forEach(user => {
				const {team} = user.val();
				
				if (teams.indexOf(team) < 0) teams.push(team);
			});

			this.props.setTeams(teams);
		}, error => {console.log(error)})
	}

	render() {
		//console.log('redux state', this.props.teams);
		return (
			<div className = "row" style={{marginTop: '50px'}}>
			 	

				 <div className = "col-xs-8 col-xs-offset-1" style={{border: "2px solid black"}}>
					<h3>Goal Coach</h3>
					<AddGoal />
					<hr />
					<h4>Goals</h4>
					<GoalList />
					<hr />
					<h4>Complete Goals </h4>
					<CompleteGoalsList />
					<hr />
					<button className = "btn btn-danger" onClick = {() => this.signOut()}>Sign Out </button>
				 </div>

				
					
			</div>	
		)
	}
}

function mapStateToProps(state) {
	const {teams} = state;
	return {teams};
}
	
export default connect(mapStateToProps, {setTeams})(App); //this connects App component to the redux state