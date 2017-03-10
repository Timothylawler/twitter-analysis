import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Twitter from './templates/twitter/twitter.jsx';
import FourOFour from './templates/fourOFour/fourOFour.jsx';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
	<Router history={browserHistory}>
		<Route path="/" component={App}>			
	
			<Route path="*" component={FourOFour}/>
		</Route>
	</Router>
	</MuiThemeProvider>
	, document.getElementById('root')
);
