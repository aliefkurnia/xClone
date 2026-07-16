const express = require("express");
const { requireAuth } = require("@clerk/express");
const router = express.Router();
const {
  UserController, PostController, LikeController,
  CommentController, FollowerController, MessageController,
} = require("../controllers");

// User
router.get("/users/me", requireAuth(), UserController.getMe);
router.get("/users/search", UserController.searchUsers);
router.get("/users/suggested", requireAuth(), UserController.getSuggestedUsers);
router.post("/users/sync", requireAuth(), UserController.syncUser);
router.get("/users/by-username/:username", UserController.getUserByUsername);
router.get("/users/by-username/:username/posts", UserController.getUserPosts);
router.get("/users/:id", UserController.getUserById);
router.get("/users", UserController.getUsers);
router.put("/users/me", requireAuth(), UserController.updateUser);

// Posts
router.get("/posts/trending", PostController.getTrending);
router.get("/posts/search", PostController.searchPosts);
router.get("/posts", PostController.getPosts);
router.get("/posts/:id", PostController.getPostById);
router.post("/posts", requireAuth(), PostController.createPost);
router.put("/posts/:id", requireAuth(), PostController.updatePost);
router.delete("/posts/:id", requireAuth(), PostController.deletePost);

// Likes
router.post("/likes", requireAuth(), LikeController.addLike);
router.delete("/likes", requireAuth(), LikeController.removeLike);

// Comments
router.get("/posts/:post_id/comments", CommentController.getComments);
router.post("/comments", requireAuth(), CommentController.addComment);
router.delete("/comments/:id", requireAuth(), CommentController.deleteComment);

// Followers
router.post("/followers", requireAuth(), FollowerController.addFollower);
router.delete("/followers/:id", requireAuth(), FollowerController.removeFollower);

// Messages
router.get("/messages", requireAuth(), MessageController.getAllMessages);
router.get("/messages/:user_id", requireAuth(), MessageController.getMessagesForUser);
router.post("/messages", requireAuth(), MessageController.sendMessage);

module.exports = router;
