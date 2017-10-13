import React, { Component } from "react";
import { connect } from "react-redux";
import { addGoal } from "../actions";
import { goalRef } from "../firebase";

class AddGoal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			team: ""
		};
	}

	addNewGoal() {
		const { title, team } = this.state;
		const { email } = this.props.user;
		goalRef.push({ email, title, team });
	}

	render() {
		return (
			<div className="form-inline">
				<div className="form-group">
					<input
						type="text"
						placeholder="Add Goal"
						className="form-control"
						style={{ marginRight: "5px" }}
						onChange={event =>
							this.setState({ title: event.target.value })}
					/>
					<select
						style={{
							marginRight: "5px",
							height: "35px",
							borderRadius: "10px"
						}}
						onChange={event =>
							this.setState({ team: event.target.value })}
					>
						<option value="">Select a team</option>
						{this.props.teams.map((team, index) => {
							return (
								<option value={team} key={index}>
									{team}
								</option>
							);
						})}
					</select>
					<button
						className="btn btn-success"
						type="button"
						onClick={() => this.addNewGoal()}
					>
						Submit
					</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { user, teams } = state;
	return { user, teams };
}
export default connect(mapStateToProps, { addGoal })(AddGoal);
