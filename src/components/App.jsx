import { connect } from "react-redux";

import { firebaseApp, userListRef } from "../firebase";
import AddGoal from "./AddGoal";
import GoalList from "./GoalList";
import CompleteGoalsList from "./CompleteGoalsList";
import OnlineUsers from "./OnlineUsers";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usersWithStatus: [],
			teams: [],
			error: {
				message: ""
			}
		};
	}

	componentWillMount() {
		userListRef.on("value", snap => {
			let usersWithStatus = [];
			snap.forEach(user => {
				const { email, status } = user.val();

				usersWithStatus.push({ email, status });
			});

			this.setState({ usersWithStatus: usersWithStatus });
		});
	}

	signOut() {
		firebaseApp.auth().signOut();
	}

	render() {
		return (
			<div className="row" style={{ marginTop: "50px" }}>
				<div
					className="col-xs-8 col-xs-offset-1"
					style={{ border: "2px solid black" }}
				>
					<h3>Goal Coach</h3>
					<AddGoal />
					<hr />
					<h4>Goals</h4>
					<GoalList />
					<hr />
					<h4>Complete Goals </h4>
					<CompleteGoalsList />
					<hr />
					<button
						className="btn btn-danger"
						onClick={() => this.signOut()}
					>
						Sign Out{" "}
					</button>
				</div>

				<div className="col-xs-3" style={{ border: "2px solid black" }}>
					{this.state.usersWithStatus.map((user, index) => {
						return <OnlineUsers key={index} user={user} />;
					})}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { email } = state;
	return { email };
}

export default connect(mapStateToProps, null)(App); //this connects App component to the redux state
