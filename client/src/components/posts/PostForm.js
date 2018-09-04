import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaGroup from "../common/TextAreaGroup";
import { addPost } from "../../actions/postAction";
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("ok u have submitted");
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const { errors, text } = this.state;
    return (
      <div className="post-form-wrapper">
        <div className="post-form mb-3">
          <div className="card card-info">
            <div className="card-header bg-info text-white">
              Create A Post.....
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextAreaGroup
                    placeholder="Start a Conversation..."
                    name="text"
                    value={text}
                    onChange={this.onChange}
                    error={errors.text}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
