import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {firebaseApp} from '../firebase';

class SignUp extends Component {
	constructor (props) {
		super(props);
		this.state = {
			email: '',
			password:'',
			error: {
				message:''
			}
		}
	}

	signUp() {
		console.log('state', this.state);
		const {email, password} = this.state;
		firebaseApp.auth().createUserWithEmailAndPassword(email, password)
		.catch(error => this.setState({error}));
	}
	render() {
		return (
			<div className = "form-inline" style={{margin: '5%'}}>
				<h2>Sign Up</h2>
				<div className = "form-group">
					<input className="form-control" style = {{marginRight: '5px'}} onChange = {event => this.setState({email: event.target.value})} type="text" placeholder="email"/>
					<input className="form-control" style = {{marginRight: '5px'}} onChange = {event => this.setState({password: event.target.value})} type="password" placeholder="password"/>
					<button className="btn btn-primary" onClick = {()=> this.signUp()} type="button">Sign Up</button>
				</div>
				<div>{this.state.error.message}</div>
				<div><Link to = {'/signin'} >Already a User? Sign In instead </Link></div>
				
			</div>	
		)
	}
}
	
export default SignUp;