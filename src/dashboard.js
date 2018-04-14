import React from 'react';
import NewPoll from './newPoll';
import MyPolls from './myPolls';
import { BrowserRouter as HashRouter, Route, Link } from 'react-router-dom';
import Poll from './poll';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			poll:0
		};
		this.polls = this.polls.bind(this);
	}
	polls (ev) {
		this.setState({
			poll:ev.target.name
		});
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
					<a className="btn btn-success" href="#newPoll" name="0" onClick={this.polls}>New Poll</a>
				</div>
				<div className="poll-btn">
					<a className="btn btn-primary" href="#myPolls" name="1" onClick={this.polls}>My Polls</a>
				</div>
				{
					this.state.poll=="0" && 
					<NewPoll/>
				}
				{
					this.state.poll=="1" && 
					<MyPolls/>
				}
				
			</div>
		);
	}
}

export default Dashboard;