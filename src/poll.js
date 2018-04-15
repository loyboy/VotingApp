import React from 'react';
import {pollActions} from './actions/polls';
import {connect} from 'react-redux';

class Poll extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		 let id = this.props.match.params.id;
		 this.props.dispatch(pollActions.getPollById(id));
	}

	render() {
		return (
			<div> view id </div>
		);
	}
}

function mapStateToProps(state) {
	const {getPollById}   =  state;
	return {
		getPollById
	}
}

Poll = connect(mapStateToProps)(Poll);
export default Poll;