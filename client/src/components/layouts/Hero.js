import React from "react";
import { Link } from "react-router-dom";
class HeroSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="landing">
				<div className="dark-overlay landing-inner text-light">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center">
								<h1 className="display-3 mb-4">
									{" "}
									Hidden Hyve Developer Community
								</h1>
								<p className="lead">
									{" "}
									Create a developer profile/portfolio, share posts and get help
									from other Hidden Hyve developers on the platform.
								</p>
								<hr />
								<Link
									to="/Register"
									className="btn btn-lg btn-info mr-2 btn-custom">
									Sign Up
								</Link>
								<Link to="/Login" className="btn btn-lg btn-light btn-custom">
									Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default HeroSection;
