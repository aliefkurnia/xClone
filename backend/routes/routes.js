const express = require("express");
const router = express.Router();

// Import controller
const {
  UserController,
  PostController,
  LikeController,
  CommentController,
  FollowerController,
  MessageController,
  AuthController,
} = require("../controllers");

// User Routes
router.post("/users", UserController.createUser); // Create User
router.get("/users", UserController.getUsers); // Get all Users
router.get("/users/:id", UserController.getUserById); // Get User by ID
router.put("/users/:id", UserController.updateUser); // Update User
router.delete("/users/:id", UserController.deleteUser); // Delete User

// Auth Routes
router.post("/login", AuthController.login); // Login Route

// Post Routes
router.post("/posts", PostController.createPost); // Create Post
router.get("/posts", PostController.getPosts); // Get all Posts
router.get("/posts/:id", PostController.getPostById); // Get Post by ID
router.put("/posts/:id", PostController.updatePost); // Update Post
router.delete("/posts/:id", PostController.deletePost); // Delete Post

// Like Routes
router.post("/likes", LikeController.addLike); // Add Like
router.delete("/likes/:id", LikeController.removeLike); // Remove Like

// Comment Routes
router.post("/comments", CommentController.addComment); // Add Comment
router.delete("/comments/:id", CommentController.deleteComment); // Delete Comment
router.get("/posts/:post_id/comments", CommentController.getComments); // Get Comments by post_id

// Follower Routes
router.post("/followers", FollowerController.addFollower); // Follow
router.delete("/followers/:id", FollowerController.removeFollower); // Unfollow

// Message Routes
router.post("/messages", MessageController.sendMessage); // Send Message
router.get("/messages", MessageController.getAllMessages); // Get all Messages
router.get("/messages/:user_id", MessageController.getMessagesForUser); // Get Messages for Specific User

module.exports = router;
