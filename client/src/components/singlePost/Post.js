import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../common/spinner";
import { getPost } from "../../actions/postAction";
import PostItem from "../posts/PostItem";
import CommentForm from "./commentForm";
import CommentFeed from "./commentFeed";
class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let singlePostContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      singlePostContent = <Spinner />;
    } else {
      singlePostContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/post-feed" className="btn btn-danger">
                Back To Post Feed
              </Link>
              {singlePostContent}
            </div>
          </div>
        </div>
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
