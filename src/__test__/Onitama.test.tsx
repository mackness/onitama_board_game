import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import Onitama from '../Onitama';
import Actions from '../actions';
import '../styles/styles.css';

const store = configureStore({});
const actions = new Actions(store);

const App = () => (
	<Provider store={store}>
		<Onitama actions={actions} />
	</Provider>
);

it('renders without crashing', () => {
	const div = document.createElement('div') as HTMLElement;
	ReactDOM.render(<App />, div);
});
