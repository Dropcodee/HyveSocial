import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import { addEducation } from "../../actions/profileActions";
class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degree: "",
      department: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const educationData = {
      degree: this.state.degree,
      department: this.state.department,
      location: this.state.location,
      to: this.state.to,
      from: this.state.from,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(educationData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onCheck() {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/Dashboard" className="btn btn-custom">
                Go Back
              </Link>
              <h1 className="text-center display-4"> Add Education </h1>
              <p className="text-center">
                Add your education story to your profile.
              </p>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Enter Program degree "
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="Enter Department"
                  name="department"
                  value={this.state.department}
                  onChange={this.onChange}
                  error={errors.department}
                />
                <TextFieldGroup
                  placeholder="Enter University Name"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />

                <TextFieldGroup
                  placeholder="Enter University starting year"
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <TextFieldGroup
                  placeholder="Enter University graduation year"
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                    info="Currently in school click here."
                  />
                  <label htmlFor="current" className="form-check-label">
                    {" "}
                    Current Project{" "}
                  </label>
                </div>
                <TextAreaGroup
                  placeholder="Programme Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about your projects"
                />
                <input
                  type="submit"
                  value="Complete Experience"
                  className="btn btn-block btn-custom"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
