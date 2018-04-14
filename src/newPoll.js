import React from 'react';
import {pollActions} from './actions/polls';
import {connect} from 'react-redux';

class NewPoll extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			options:[0,1],
			values:[],
			name:""
		};
		this.moreOptions = this.moreOptions.bind(this);
		this.submitPoll = this.submitPoll.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
	}
	moreOptions() {
		this.setState({
			options:[...this.state.options,this.state.options.length-1]
		});
	}
	handleNameChange (e){
		this.setState({
			name:e.target.value
		});
	}
	handleChange (e) {
		const { name, value } = e.target;
		const id = name.split("new-poll-option")[1];
		let values = [...this.state.values];
		values[id] = value;
		this.setState({
			values:values
		});
	}
	submitPoll() {
		const email = JSON.parse(localStorage.getItem("user")).email;
		let pollName = this.state.name;
		let options = this.state.values;
		this.props.dispatch(pollActions.sendPoll(email, pollName,options));
	}
	render () {
		var self = this;
		var options = this.state.options.map(function(el, i){
			return <div className="form-group" key={i}>
				    <input type="text" className="form-control" name={"new-poll-option"+i} id={"new-poll-option"+i} placeholder="your option"
						onChange = {self.handleChange}  />
				  </div>;
		});
		return (
			<div className="new-poll">  
				<div className="new-poll-title">
					<p >Poll name </p>
					<div className="form-group" >
				    <input type="text" className="form-control" name="new-poll-name" id="new-poll-name" placeholder="name your poll"
						onChange={this.handleNameChange}/>
				  </div>
				</div>
				<div className="new-poll-options"> 
					<p>Options</p>
					{options}
				</div>
				<div className="more-option-btn">
					<a className="btn btn-info" onClick={this.moreOptions}>More options</a>			
				</div>
				<div className="option-submit-btn">
					<a className="btn btn-success" onClick={this.submitPoll}>Submit</a>			
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	const {poll}   =  state;
	return {
		poll
	}
}

NewPoll = connect(mapStateToProps)(NewPoll);
export default NewPoll;