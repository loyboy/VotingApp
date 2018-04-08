import React from 'react';
import ReactDOM from 'react-dom';
require("../styles/index.scss");
import { BrowserRouter as HashRouter, Route, Link } from 'react-router-dom';
import { Switch, Redirect,browserHistory } from 'react-router';
import Login from './login';
import Register from './register';
import Home from './home';

class VotingApp extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
			 <div className="navar-menu">
			  <nav className="navbar  navbar-dark bg-primary">
 				 <a className="navbar-brand" href="/">
    				Voting App 
  				</a>
  				 <div className="navbar-auth">
  				 	<a className="navbar-right btn btn-success" href="/register"> Sign Up</a>
  				 	<a className="navbar-right btn btn-default" href="/login"> Sign In </a>
				</div>
			  </nav>
			 </div>

			 <HashRouter >
		    	<div>
		        	<Switch>
		        		<Route exact path="/" component={Home} />
		          		<Route exact path="/login" component={Login} />
		          		<Route exact path="/register" component={Register} />
		        	</Switch>
		    	</div>
		  	</HashRouter>
			  
			</div>
		);
	}
}

export default VotingApp;