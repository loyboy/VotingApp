import React from 'react';
import NewPoll from './newPoll';
class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="home"> 
				<div className="app-title"> 
					Dashboard
				</div>
				<div className="home-title">
					<p>Manage your polls today?</p> 
				</div>
				<div className="poll-btn">
					<a className="btn btn-success" href="/newPoll">New Poll</a>
				</div>
				<div className="poll-btn">
					<a className="btn btn-primary" href="/myPolls">My Polls</a>
				</div>
				<NewPoll/>
			</div>
		);
	}
}

export default Dashboard;