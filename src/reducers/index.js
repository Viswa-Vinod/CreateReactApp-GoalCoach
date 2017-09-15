import {combineReducers} from 'redux';
import user from './reducer_user';
import goals from './reducer_goals';
import completeGoals from './reducer_completedgoals';
import teams from './reducer_teams';

export default combineReducers({
	user,goals, completeGoals, teams
})