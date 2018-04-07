import React from 'react';
import {userActions} from './actions/index';
import {connect} from 'react-redux';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email:"",
			password:""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		const {name, value} = e.target;
		this.setState({
			[name]:value
		});
	}
	componentDidUpdate(prevState,prevProps) {
		if(prevProps.auth!=this.props.auth) {
			// update 
		}
	}
	handleSubmit(e) {
		e.preventDefault();
		const {email,password} = this.state;
		const {dispatch,auth}  = this.props;
		const user = {
			email:email,
			password:password
		};
    	dispatch(userActions.login(user.email,user.password));
	}
	render() {
		return (
			<div className="login-body"> 
				<form onSubmit={this.handleSubmit}>
				  <div className="form-group">
				    <label htmlFor="inputEmail">Email address</label>
				    <input type="email" className="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange}/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="inputPassword">Password</label>
				    <input type="password" className="form-control" name="password" id="inputPassword" placeholder="Password"
						onChange={this.handleChange}/>
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

Login = connect(mapStateToProps)(Login);
export default Login