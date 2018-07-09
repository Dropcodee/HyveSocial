import React from "react";
import axios from "axios";
import classnames from "classnames";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	onSubmit = e => {
		e.preventDefault();
		const loginData = {
			email: this.state.email,
			password: this.state.password
		};
		axios
			.post("/api/users/login", loginData)
			.then(res => console.log(res.data))
			.catch(err => this.setState({ errors: err.response.data }));
	};
	render() {
		const { errors } = this.state;
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">
								Sign in to your HyveSync account
							</p>
							<div className="card card-custom">
								<svg className="svg-1" />
								<div className="card-body">
									<form onSubmit={this.onSubmit}>
										<div className="form-group">
											<input
												type="email"
												className={classnames("form-control form-control-lg", {
													"is-invalid": errors.email
												})}
												placeholder="Email Address"
												value={this.state.email}
												onChange={this.onChange}
												name="email"
											/>
											{errors.email && (
												<div className="invalid-feedback">{errors.email}</div>
											)}
										</div>
										<div className="form-group">
											<input
												type="password"
												className={classnames("form-control form-control-lg", {
													"is-invalid": errors.password
												})}
												placeholder="Password"
												value={this.state.password}
												onChange={this.onChange}
												name="password"
											/>
											{errors.password && (
												<div className="invalid-feedback">
													{errors.password}
												</div>
											)}
										</div>
										<input
											type="submit"
											className="btn btn-info btn-block mt-4 btn-form"
										/>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Login;
