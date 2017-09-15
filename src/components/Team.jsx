import React, {Component} from 'react';


class Team extends Component {

	render() {

		const team = this.props.team;
		
		return (
			<div>
				{team}
			</div> 
		)
	}

}


export default Team;