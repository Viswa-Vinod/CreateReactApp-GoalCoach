import React, { Component } from "react";
import { connect } from "react-redux";
import { completeGoalRef, goalRef } from "../firebase";

class GoalItem extends Component {
	completedGoal() {
		//add to complete goal in the database
		//remove thsi goal from the goalsRef
		const { email } = this.props.user;
		const { title, serverKey, team } = this.props.goal;
		goalRef.child(serverKey).remove();

		completeGoalRef.push({ email, title, team });
	}

	render() {
		const { email, title, team } = this.props.goal;
		return (
			<div
				style={{ margin: "5px", borderBottom: "1px dashed black" }}
				className="row"
			>
				<strong className="col-xs-3">{title}</strong>
				<span style={{ margin: "5px" }} className="col-xs-3">
					Submitted by: <em>{email}</em>
				</span>
				<span style={{ margin: "5px" }} className="col-xs-3">
					Assigned to: <em>{team}</em>
				</span>
				<button
					className="btn btn-sm btn-primary"
					onClick={() => this.completedGoal()}
				>
					Complete
				</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { user } = state;
	return { user };
}

export default connect(mapStateToProps, null)(GoalItem);
