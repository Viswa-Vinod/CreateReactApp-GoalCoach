import React, { Component } from "react";

class OnlineUsers extends Component {
	render() {
		console.log("user in OnlineUsers", this.props.user);

		return (
			<div>
				{this.props.user.email} is {this.props.user.status}
			</div>
		);
	}
}

export default OnlineUsers;
