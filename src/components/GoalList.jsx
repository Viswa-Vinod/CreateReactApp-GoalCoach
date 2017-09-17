import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setGoals} from '../actions';
import GoalItem from './GoalItem';

class GoalList extends Component {

	
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