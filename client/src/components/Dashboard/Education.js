import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";
class Education extends Component {
  onDeleteEdu = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const education = this.props.educationProps.map(edu => (
      <tr key={edu._id}>
        <td>{edu.location}</td>
        <td>{edu.department}</td>
        <td>{edu.department}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> ->
          {"  "}
          {edu.to === null ? (
            `   CURRENTLY IN SCHOOL.`
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          {" "}
          <button
            onClick={this.onDeleteEdu.bind(edu._id)}
            className="btn btn-danger btn-custom"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <div className="text-muted"> Education: </div>
        <table className="table">
          <thead>
            <tr>
              <th>School Name</th>
              <th>Programme </th>
              <th>Department Name </th>
              <th>Programme Duration</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}
Education.propTypes = {
  deleteEducation: propTypes.func.isRequired
};
export default connect(
  null,
  { deleteEducation }
)(Education);
