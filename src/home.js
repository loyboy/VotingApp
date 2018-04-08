import React from 'react';

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
					Create polls with live results 
				</div>
				<div className="signup">
					<a className="btn btn-success" href="/register"> Sign Up</a>
				</div>
			</div>
		);
	}
}

export default Home;