import React from 'react';
import {pollActions} from './../actions/polls';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';

class Polls  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			polls:[]
		}
	}
	componentDidMount () {
		this.props.dispatch(pollActions.getAllPolls());
	}
	componentDidUpdate(prevProps,prevState) {

		if(prevProps.getAllPolls!=this.props.getAllPolls &&  this.props.getAllPolls["got_all_polls"]) {
			this.setState({
				polls:this.props.getAllPolls.polls
			});
		}
	}
	render() {
		var polls = this.state.polls.map(function (el,id){
			return <div className="form-group" key={id}>
				   <Link to={{ pathname: '/poll/'+el._id }}>
				    <input type="text" className="form-control" name="all-polls-name" id="all-polls-name" readOnly 
					 value = {el.name}  />
					</Link>
				  </div>
		});

		return (
			<div > 
				{polls}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {getAllPolls}   =  state;
	return {
		getAllPolls
	}
}
Polls = connect(mapStateToProps)(Polls);
export default Polls;