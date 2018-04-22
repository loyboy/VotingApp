import React from 'react';
import ReactDOM from 'react-dom';
import VotingApp from './components/app';
import store from './helpers/store';
import {Provider} from 'react-redux';

ReactDOM.render(
	<Provider store= {store}>
		<VotingApp/>
	</Provider>,
	document.getElementById("root")
);