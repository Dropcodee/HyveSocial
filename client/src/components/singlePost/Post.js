import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/spinner";
import { getPost } from "../../actions/postAction";
class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        <h2> Add a comment</h2>
      </div>
    );
  }
}
Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  { getPost }
)(Post);
