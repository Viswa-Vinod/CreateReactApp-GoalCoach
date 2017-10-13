import { SET_GOALS, ADD_GOAL } from "../constants";

export default (state = [], action) => {
	switch (action.type) {
		case SET_GOALS:
			const { goals } = action;
			return goals;
		case ADD_GOAL:
			const { goal } = action;
			return { ...state, goal };
		default:
			return state;
	}
};
