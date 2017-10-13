import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firebaseApp, userRef } from "../firebase";
import { setTeams } from "../actions";

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			team: "",
			error: {
				message: ""
			}
		};
	}

	signUp() {
		console.log("state", this.state);
		const { email, password, team } = this.state;
		firebaseApp
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch(error => this.setState({ error }));
		userRef.push({ email, team });
		// this.props.setTeams(teams);
	}
	render() {
		// console.log('this.props', this.props);
		return (
			<div className="form-inline" style={{ margin: "5%" }}>
				<h2>Sign Up</h2>
				<div className="form-group">
					<input
						className="form-control"
						style={{ marginRight: "5px" }}
						onChange={event =>
							this.setState({ email: event.target.value })}
						type="text"
						placeholder="email"
					/>
					<input
						className="form-control"
						style={{ marginRight: "5px" }}
						onChange={event =>
							this.setState({ password: event.target.value })}
						type="password"
						placeholder="password"
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
						className="btn btn-primary"
						onClick={() => this.signUp()}
						type="button"
					>
						Sign Up
					</button>
				</div>
				<div>{this.state.error.message}</div>
				<div>
					<Link to={"/signin"}>Already a User? Sign In instead </Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { teams } = state;
	return { teams };
}

export default connect(mapStateToProps, { setTeams })(SignUp);
