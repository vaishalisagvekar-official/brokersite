import React, { Component, useState } from 'react';
import { withRouter } from 'next/router';

class EnquiryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name : '',
			email : '',
			phoneNo : '',
			regex : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		}
	}

	onChangeHandler = (e) => {
		const inputData = {};
		inputData[e.target.name] = e.target.value;
		this.setState(inputData);
	}

	render(){
		const displayStyle = this.props.isFromModal == true ? 'none' : 'flex';
		return (
			<React.Fragment>
				<div className="col-12">
					<div style={{display: displayStyle, marginBottom: '10px'}}>
						<h4>Get In Touch</h4>
					</div>
					<div style={{marginBottom: '14px'}}>Please fill in your details below and we will get in touch with you shorlty</div>
				</div>
				<form>
					<div className="row">
						<div className="col-12">
							<label htmlFor="name" className="col-form-label">Name</label>
							<input 
								type="text" 
								name="name" 
								id="name" 
								className="form-control"
								value={this.state.name} 
								onChange={this.onChangeHandler}
								required/>
						</div>
						<div className="col-12">
							<label htmlFor="email">Email</label>
							<input 
								type="email" 
								name="email" 
								id="email" 
								className="form-control"
								value={this.state.email} 
								pattern={this.state.regex} 
								onChange={this.onChangeHandler}
								required/>
						</div>
						<div className="col-12">
							<label htmlFor="phoneNo">Phone Number</label>
							<input 
								type="tel" 
								name="phoneNo" 
								id="phoneNo" 
								className="form-control"
								value={this.state.phoneNo} 
								pattern="[0-9]{10}" 
								onChange={this.onChangeHandler}
								required/>
						</div>
						<p className="col-12 tncLabel">
							By submitting above details, you are authorizing Rajshree Builders and its associate/partner companies to call you and send transcational/promotional communicatin even though you may be registered under DNC.
						</p>	
					</div>
					<div className="row" style={{justifyContent : 'center'}}>
						<button className="btn themeColor" onClick={this.onSubmitEquiryForm}>SUBMIT</button>
					</div>
				</form>
			</React.Fragment>
		)
	}
}

export default withRouter(EnquiryForm);
