import React from 'react';
import {userActions} from './actions/index';
import {connect} from 'react-redux';


class MyPolls extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			myPolls:[]
		};
	}
	componentDidMount() {
		const email = JSON.parse(localStorage.getItem("user")).email;
		this.props.dispatch(userActions.getMyPolls(email));
	}
	componentDidUpdate(prevProps,prevState) {
		if(prevProps.getMyPolls!=this.props.getMyPolls){
			if(this.props.getMyPolls["got_polls"]) {
				this.setState({
					myPolls:this.props.getMyPolls.data.email
				});
			}
		}
	}
	render () {

		var myPolls = this.state.myPolls.map(function(el,id){
			return <div className="form-group" key={id}>
				    <input type="text" className="form-control" name="new-poll-name" id="new-poll-name" readOnly value={el.name}
					/>
				  </div>
				  
		});
		return (
			<div className="my-polls"> 
				{myPolls}
			</div>
		);
	}
}
function mapStateToProps(state) {
	const {getMyPolls}   =  state;
	return {
		getMyPolls
	}
}
MyPolls = connect(mapStateToProps)(MyPolls);
export default MyPolls;