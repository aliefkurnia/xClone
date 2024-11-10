// controllers/index.js
const UserController = require("./userController");
const PostController = require("./postController");
const LikeController = require("./likeController");
const CommentController = require("./commentController");
const FollowerController = require("./followerController");
const MessageController = require("./messageController");
const AuthController = require("./AuthController");
module.exports = {
  UserController,
  PostController,
  LikeController,
  CommentController,
  FollowerController,
  MessageController,
  AuthController,
};
