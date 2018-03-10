import  { combineReducers } from 'redux';
import gameReducer from './gameReducer';

// Root Reducer
const rootReducer = combineReducers({
	game: gameReducer
});

export default rootReducer;