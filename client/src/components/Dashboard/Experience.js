import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";
class Experience extends Component {
  onDeleteExp = id => {
    this.props.deleteExperience(id);
  };
  render() {
    const experience = this.props.experienceProps.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> ->{"  "}
          {exp.to === null ? (
            `   CURRENTLY WORKING ON THIS PROJECT.`
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          {" "}
          <button
            onClick={this.onDeleteExp.bind(exp._id)}
            className="btn btn-danger btn-custom"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <div className="text-muted"> Experiences: </div>
        <table className="table">
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Project Title</th>
              <th>Project Duration</th>
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}
Experience.propTypes = {
  deleteExperience: propTypes.func.isRequired
};
export default connect(
  null,
  { deleteExperience }
)(Experience);
