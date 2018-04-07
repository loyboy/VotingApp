import React from 'react';
import {userActions} from './actions/index';
import {connect} from 'react-redux';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username:"",
			email:"",
			password:""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		const {name,value} = e.target;
		this.setState({
			[name]:value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		const {username, email, password} = this.state;
		const {dispatch,auth}  = this.props;
		const user = {
			username:username,
			email:email,
			password:password
		};
    	dispatch(userActions.register(user.username,user.email,user.password));
	}
	render() {
		return (
			<div className="register-body"> 
				<form onSubmit={this.handleSubmit}>
				  <div className="form-group">
				    <label htmlFor="inputUsername">User name</label>
				    <input type="text" className="form-control" name="username" id="inputUsername" aria-describedby="usernameHelp" placeholder="Enter username" onChange={this.handleChange}/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="inputEmail">Email address</label>
				    <input type="email" className="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange}/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="inputPassword">Password</label>
				    <input type="password" className="form-control" name="password" id="inputPassword" placeholder="Password" onChange={this.handleChange}/>
				  </div>
				  
				  <button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		)
	}
}
function mapStateToProps(state) {
	const {auth}   =  state;
	return {
		auth
	}
}
Register = connect(mapStateToProps)(Register);
export default Register;