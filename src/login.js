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
	handleSubmit(e) {
		e.preventDefault();
		const {email,password} = this.state;
		const {dispatch,fake}  = this.props;
		const user = {
			email:email,
			password:password
		};
		const requestOptions = {
        	method: 'POST',
        	headers: { 'Content-Type': 'application/json' },
        	body: JSON.stringify(user)	
    	};
    	dispatch(userActions.login(this.state.email,this.state.password));
    	/*
    	fetch('/login', requestOptions).then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json()}).then(user => {
            // login success with  a token 
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log(JSON.stringify(user));
            }
            return user;
        }); */
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
	const {fake}   =  state;
	console.log("mapStateToProps " + fake);
	return {
		fake
	}
}

Login = connect(mapStateToProps)(Login);
export default Login