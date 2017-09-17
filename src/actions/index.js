import {SIGNED_IN, SET_GOALS, SET_COMPLETED, SET_TEAMS, ADD_GOAL} from '../constants';


export function logUser(email) {
	const action = {
		type: SIGNED_IN,
		email
	}

	return action;
}

export function setGoals(goals) {
	const action = {
		type: SET_GOALS,
		goals
	}

	return action;
}

export function addGoal(goal) {
	const action = {
		type: ADD_GOAL,
		goal
	}

	return action;
}

export function setCompleted(completeGoals) {
	const action = {
		type: SET_COMPLETED,
		completeGoals
	}
	return action;
}

export function setTeams(teams) {
	const action = {
		type: SET_TEAMS,
		teams
	}

	return action;
}