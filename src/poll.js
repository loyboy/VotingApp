import React from 'react';
import {userActions} from './actions/index';
import {connect} from 'react-redux';

class Poll extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		 
	}

	render() {
		return (
			<div> view id </div>
		);
	}
}

function mapStateToProps(state) {
	const {getPoll}   =  state;
	return {
		getPoll
	}
}

Poll = connect(mapStateToProps)(Poll);
export default Poll;