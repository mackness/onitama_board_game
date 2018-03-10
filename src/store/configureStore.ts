// Redux Store Configuration
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import loggingMiddleware from './middleware/logging';

const configureStore = (initialState: any) => {
	return createStore(rootReducer, initialState, composeWithDevTools(
		applyMiddleware(loggingMiddleware),
	));
};

export default configureStore;