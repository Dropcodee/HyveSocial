import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup  from "../common/TextAreaGroup";
class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
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
  onSubmit(e) {
    e.preventDefault()
    console.log("submit")
  }
  onChange(e) {
      this.setState({[e.target.name]: e.target.value})
  }
  onCheck() {
      this.setState({
          disabled: !this.state.disabled,
          current: !this.state.current
      })
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/Dashboard" className="btn btn-custom">
                Go Back
              </Link>
              <h1 className="text-center display-4"> Add Experience </h1>
              <p className="text-center">
                Add any projects you have done in the past or currently doing.
              </p>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Enter Group"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="Enter Project Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="Enter Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextFieldGroup
                  placeholder="Enter Project starting duration"
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />

                <TextFieldGroup
                  placeholder="Enter project ending duration"
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
                    onChange = {this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label"> Current Project </label> 
                </div>
                <TextAreaGroup
                  placeholder="Project Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about your projects"
                />
                <input type="submit" value="Complete Experience" className="btn btn-block btn-custom"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps)(withRouter(AddExperience));
