const { Like, Post } = require("../models");

const LikeController = {
  addLike: async (req, res) => {
    try {
      const user_id = req.auth.userId;
      const { post_id } = req.body;
      const existing = await Like.findOne({ where: { user_id, post_id } });
      if (existing) return res.status(400).json({ message: "Already liked" });
      const like = await Like.create({ user_id, post_id });
      res.status(201).json(like);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error adding like", error: err.message });
    }
  },

  removeLike: async (req, res) => {
    try {
      const user_id = req.auth.userId;
      const { post_id } = req.body;
      const like = await Like.findOne({ where: { user_id, post_id } });
      if (!like) return res.status(404).json({ message: "Like not found" });
      await like.destroy();
      res.status(200).json({ message: "Like removed" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error removing like", error: err.message });
    }
  },
};

module.exports = LikeController;
