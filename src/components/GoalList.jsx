import React, {Component} from 'react';
import {connect} from 'react-redux';
import {goalRef} from '../firebase';
import {setGoals} from '../actions';
import GoalItem from './GoalItem';

class GoalList extends Component {

	componentDidMount() {
		goalRef.on('value', snap => {
			let goals = [];
			snap.forEach(goal => {
				const {email, title, team} = goal.val();
				const serverKey = goal.key; //get the firebase assigned key of the goal
				
				goals.push({email, title, serverKey, team});
				

			})

			this.props.setGoals(goals);
		})
	}

	render () {
		
		return (
			<div>{this.props.goals.map((goal, index) => {
				return (
					
					<GoalItem key={index} goal={goal}/>
				)
			})}</div>
		)
	}
}

function mapStateToProps(state) {
	const {goals} = state;
	return {goals};
}

export default connect(mapStateToProps, {setGoals})(GoalList);