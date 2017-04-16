import React from "react";
import Request from "superagent";
import _ from "lodash";
import cookie from 'react-cookie';

export class Home extends React.Component{

	constructor(){
		super();
		this.state = {};
	}

	componentWillMount(){
		
	}

	handleClick(event) {
			var user = document.getElementById("user").value;
			if(user == "" || user == null) user = null;
			var password = document.getElementById("password").value;
			if(password == "" || password == null) password = null;
    		var url = "http://localhost:3000/api/authentication/"+user+"/"+password;
    		console.log("..................");
    		console.log(user);
    		console.log(password);
			Request.get(url).then((response) => {
				console.log("Response Value = "+response.body.result);
				console.log("Token Value = "+response.body.token);
				console.log("Full Response = "+JSON.stringify(response));
				if(response.body.result == "SUCCESS"){
					console.log("Saving Cookie...............");
					cookie.save('COOKIE', response.body.token, { path: '/' });
				}
				this.setState({
					result: response.body.result,
					result1: response.body.result,
					cookieValue: response.body.token
				});
			});

  	}
	render(){
		var result = this.state.result;
		
		console.log(this.props);
		return(
			<div>
				<p>UserId</p>
				<input ref="textBox" type="text" id="user" name="user"/>
				<p>Password</p>
				<input ref="textBox" type="password" id="password" name="password"/>
				<p>
					<input ref="button" value="LOGIN" type="button" onClick={this.handleClick.bind(this)}/>
				</p>
				<p>{result}</p>
			</div>
		);
	}
}