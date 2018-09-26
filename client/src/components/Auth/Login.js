import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authAction";
import TextFieldGroup from "../common/TextFieldGroup";

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
  componentWillMount() {
    // check if isAuthenticated is true then redirect user back to dashboard
    if (this.props.auth.isAuthenticated) {
      // redirect user to dashboard
      this.props.history.push("/Dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/Dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    let btn = document.getElementById("regBtn");
    if (btn.value === "Submit") {
      btn.value = "Loading...";
    } else if (this.state.errors) {
      btn.value = "Submit";
    }
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(loginData);
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
                    <TextFieldGroup
                      name="email"
                      type="email"
                      placeholder="johndoe@mail.com"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />

                    <TextFieldGroup
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />

                    <input
                      id="regBtn"
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
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
