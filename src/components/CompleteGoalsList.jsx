import React, { Component } from "react";
import { connect } from "react-redux";
import { setCompleted } from "../actions";
import { completeGoalRef } from "../firebase";

class CompleteGoalsList extends Component {
	componentDidMount() {
		completeGoalRef.on("value", snap => {
			let completeGoals = [];
			snap.forEach(completeGoal => {
				const { email, title, team } = completeGoal.val();
				completeGoals.push({ email, title, team });
			});

			this.props.setCompleted(completeGoals);
		});
	}

	clearCompleted() {
		completeGoalRef.set([]);
	}

	render() {
		return (
			<div style={{ margin: "5px" }}>
				{this.props.completeGoals.map((completeGoal, index) => {
					const { title, email, team } = completeGoal;
					return (
						<div
							key={index}
							className="row"
							style={{ borderBottom: "1px dashed black" }}
						>
							<strong
								className="col-xs-3"
								style={{ margin: "5px" }}
							>
								{title}
							</strong>
							<span className="col-xs-3">
								completed by<em> {email}</em>
							</span>
							<span className="col-xs-3">
								Assigned To <em> {team}</em>
							</span>
						</div>
					);
				})}

				<button
					className="btn btn-primary"
					style={{ marginTop: "5px" }}
					onClick={() => this.clearCompleted()}
				>
					{" "}
					Clear All
				</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { completeGoals } = state;
	return { completeGoals };
}

export default connect(mapStateToProps, { setCompleted })(CompleteGoalsList);
