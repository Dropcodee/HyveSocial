import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/spinner";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import { getPosts } from "../../actions/postAction";
class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let postController;

    if (posts === null || loading) {
      postController = <Spinner />;
    } else {
      postController = <PostFeed posts={posts} />;
    }
    return (
      <div className="post-feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postController}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
