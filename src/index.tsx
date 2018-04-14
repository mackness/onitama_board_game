import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from './store/configureStore';
import Onitama from './Onitama';
import GameSettings from './components/GameSettings';
import registerServiceWorker from './registerServiceWorker';
import Actions from './actions';
import './styles/base.css';

const store = configureStore({});
const actions = new Actions(store);

const App = () => (
	<Provider store={store}>
		<Router>
			<React.Fragment>
				<Route exact={true} path='/' component={GameSettings} />
					<Route
						path='/game'
						render={(props) => <Onitama location={props.location} actions={actions} />}
					/>
			</React.Fragment>
		</Router>
	</Provider>
);

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
