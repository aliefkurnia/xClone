// backend/controllers/FollowerController.js
const { Follower } = require("../models");

const FollowerController = {
  // Menambahkan pengikut
  addFollower: async (req, res) => {
    try {
      const { follower_user_id, followed_user_id } = req.body;
      const follower = await Follower.create({
        follower_user_id,
        followed_user_id,
      });
      res.status(201).json(follower);
    } catch (err) {
      res.status(500).json({ message: "Error adding follower", error: err });
    }
  },

  // Menghapus pengikut
  removeFollower: async (req, res) => {
    try {
      const follower = await Follower.findOne({
        where: {
          follower_user_id: req.body.follower_user_id,
          followed_user_id: req.body.followed_user_id,
        },
      });
      if (!follower) {
        return res.status(404).json({ message: "Follower not found" });
      }
      await follower.destroy();
      res.status(200).json({ message: "Follower removed successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error removing follower", error: err });
    }
  },
};

module.exports = FollowerController;
