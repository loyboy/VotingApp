import React from 'react';
import ReactDOM from 'react-dom';
require("../styles/index.scss");

class VotingAppp extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="navar-menu">
			<nav className="navbar  navbar-dark bg-primary">
 				 <a className="navbar-brand" href="#">
    				Voting App 
  				</a>
  				 <div className="navbar-auth">
  				 	<a className="navbar-right btn btn-success" href="#"> Sign Up</a>
  				 	<a className="navbar-right btn btn-default" href="#"> Sign In </a>
				</div>
			</nav>

			</div>
		);
	}
}

ReactDOM.render(<VotingAppp/>,document.getElementById("root"));