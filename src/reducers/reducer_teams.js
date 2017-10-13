import { SET_TEAMS } from "../constants";

export default (state = [], action) => {
	switch (action.type) {
		case SET_TEAMS:
			const { teams } = action;
			return teams;
		default:
			return state;
	}
};
