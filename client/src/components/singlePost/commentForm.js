import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaGroup from "../common/TextAreaGroup";
import { addComment } from "../../actions/postAction";
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;
    const commentData = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addComment(postId, commentData);
    this.setState({ text: "" });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form-wrapper">
        <div className="post-form mb-3">
          <div className="card card-info">
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextAreaGroup
                    placeholder="Reply to this post..."
                    name="text"
                    value={this.state.text}
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

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
