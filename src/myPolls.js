import React from 'react';
import {userActions} from './actions/index';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';

class MyPolls extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			myPolls:[],
			email:"",
			delete_name:"",
		};
		this.deletePoll = this.deletePoll.bind(this);
	}
	componentDidMount() {
		const email = JSON.parse(localStorage.getItem("user")).email;
		this.props.dispatch(userActions.getMyPolls(email));
		this.setState({
			email:email
		});
	}
	componentDidUpdate(prevProps,prevState) {

		if(prevProps.getMyPolls!=this.props.getMyPolls){
			if(this.props.getMyPolls["got_polls"]) {
				this.setState({
					myPolls:this.props.getMyPolls.data.email
				});
			}
		}
		if(prevProps.deleteMyPoll!=this.props.deleteMyPoll) {
			if(this.props.deleteMyPoll["deleted_poll"]) {
				var myPolls = [...this.state.myPolls];
				var self = this;
				myPolls = myPolls.filter(function(x){
					return x.name!=self.props.deleteMyPoll["name"]["name"]
				});
				this.setState({
					myPolls:myPolls
				});
			}
		}
	}
	deletePoll(e) {
		this.props.dispatch(userActions.deleteMyPoll(this.state.email,e.target.name));
	} 
	render () {
		var self = this;
		var myPolls = this.state.myPolls.map(function(el,id){
			return <div className="form-group" key={id}>
				   <Link to={{ pathname: '/polls/'+el._id }}>
				    <input type="text" className="form-control" name="new-poll-name" id="new-poll-name" readOnly 
					 value = {el.name}  />
					</Link>
					<button type="submit" name={el.name} onClick = {self.deletePoll} className="delete-btn btn btn-danger">Delete</button>
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
	const {getMyPolls,deleteMyPoll}   =  state;
	return {
		getMyPolls,
		deleteMyPoll
	}
}
MyPolls = connect(mapStateToProps)(MyPolls);
export default MyPolls;