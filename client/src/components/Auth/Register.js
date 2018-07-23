import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { registerUser } from "../../actions/authAction";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    // check if isAuthenticated is true then redirect user back to dashboard
    if (this.props.auth.isAuthenticated) {
      // redirect user to dashboard
      this.props.history.push("/Dashboard");
    }
  }
  // Adding life cycle method to recieve new props
  componentWillReceiveProps(nextProps) {
    // will check if there is an error props and setstate
    // errors to the props
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const newMember = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newMember, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your HyveSync Account.</p>
              <div className="card card-custom">
                <svg className="svg-1" />
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      name="name"
                      type="text"
                      placeholder="Enter Your name"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                    />

                    <TextFieldGroup
                      name="email"
                      type="email"
                      placeholder="johndoe@mail.com"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                      info="Our site makes use of Gravatar for now so enter a gavatar mail for profile image, thanks for understanding."
                    />

                    <TextFieldGroup
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />

                    <TextFieldGroup
                      name="password2"
                      type="password"
                      placeholder="Verify Password"
                      value={this.state.password2}
                      onChange={this.onChange}
                      error={errors.password2}
                    />

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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
