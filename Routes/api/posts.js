const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// bringing in models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// bringing in validation for posts
const validatePostData = require("../../validation/post");
// end of post validation

router.get("/test", (req, res) => res.json({ msg: "we have 0 post" }));

// @route: GET api/posts
// @desc: GET all posts
// @access: Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ noAvailablePostError: "No post available" })
    );
});

// @route: GET api/posts/:id
// @desc: GET single post by id
// @access: Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ noPostById: "No post found with that id" })
    );
});

// @route: DELETE api/posts/:id
// @desc: DELETE  post
// @access: PRIVATE
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        // check for post owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ Unauthorised: "User not authorised" });
        }
        // delete post

        post
          .remove()
          .then(() => {
            res.json({ success: true });
          })
          .catch(err =>
            res.status(404).json({ postNotFound: "post not found" })
          );
      });
    });
  }
);

// @route: POST  api/posts/like/:id
// @desc: POST Like posts
// @access: PRIVATE

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);
// @route: POST api/posts
// @desc: POST create a new post
// @access: PRIVATE

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostData(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

// @route: POST api/posts/comments/:id of the post
// @desc: POST add comments to post
// @access: PRIVATE

router.post(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostData(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newCommentPost = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newCommentPost);

        // save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postNotFound: "Post not found" }));
  }
);

// @route: DELETE api/posts/comments/:id/:comment_id
// @desc: DELETE a comment
// @access: PRIVATE

router.delete(
  "/comments/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // check for comment if it exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).lenght === 0
        ) {
          res
            .status(404)
            .json({ commentNotFound: "Sorry Comment does not exist" });
        }

        // get the comment post index
        const removeCommentIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // remove the comment
        post.comments.splice(removeCommentIndex, 1);

        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postNotFound: "Post not found" }));
  }
);
module.exports = router;
