// backend/controllers/LikeController.js
const { Like } = require("../models");

const LikeController = {
  // Menambahkan Like pada Postingan
  addLike: async (req, res) => {
    try {
      const { user_id, post_id } = req.body;
      const like = await Like.create({ user_id, post_id });
      res.status(201).json(like);
    } catch (err) {
      res.status(500).json({ message: "Error adding like", error: err });
    }
  },

  // Menghapus Like dari Postingan
  removeLike: async (req, res) => {
    try {
      const like = await Like.findOne({
        where: {
          user_id: req.body.user_id,
          post_id: req.body.post_id,
        },
      });
      if (!like) {
        return res.status(404).json({ message: "Like not found" });
      }
      await like.destroy();
      res.status(200).json({ message: "Like removed successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error removing like", error: err });
    }
  },
};

module.exports = LikeController;
