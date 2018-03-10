import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Onitama from './Onitama';
import registerServiceWorker from './registerServiceWorker';
import Actions from './actions';
import './styles/styles.css';

const store = configureStore({});
const actions = new Actions(store);

const App = () => (
	<Provider store={store}>
		<Onitama actions={actions} />
	</Provider>
);

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
