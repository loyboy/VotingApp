import React from 'react';
import Polls from './polls';

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="home"> 
				<div className="app-title"> 
					Voting App
				</div>
				<div className="home-title">
					<p>Create polls with live results </p>
				</div>
				<div className="signup">
					<a className="btn btn-success" href="/register"> Sign Up</a>
				</div>
				<div className="polls">
					<Polls/>
				</div>
			</div>
		);
	}
}

export default Home;