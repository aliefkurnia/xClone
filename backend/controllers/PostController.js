// backend/controllers/PostController.js
const { Post } = require("../models");

const PostController = {
  // Membuat postingan baru
  createPost: async (req, res) => {
    try {
      const { user_id, content, media_url } = req.body;
      const post = await Post.create({ user_id, content, media_url });
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({ message: "Error creating post", error: err });
    }
  },

  // Membaca semua postingan
  getPosts: async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: "Error fetching posts", error: err });
    }
  },

  // Membaca satu postingan berdasarkan ID
  getPostById: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ message: "Error fetching post", error: err });
    }
  },

  // Menghapus postingan
  deletePost: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      await post.destroy();
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting post", error: err });
    }
  },

  // Memperbarui postingan
  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const { content, media_url } = req.body;

      // Mencari postingan berdasarkan ID
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Memperbarui postingan dengan data baru
      post.content = content || post.content;
      post.media_url = media_url || post.media_url;

      await post.save(); // Menyimpan perubahan ke database

      res.status(200).json({ message: "Post updated successfully", post });
    } catch (err) {
      res.status(500).json({ message: "Error updating post", error: err });
    }
  },
};

module.exports = PostController;
