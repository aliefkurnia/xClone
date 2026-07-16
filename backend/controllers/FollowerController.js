const { Follower } = require("../models");

const FollowerController = {
  addFollower: async (req, res) => {
    try {
      const follower_user_id = req.auth.userId;
      const { followed_user_id } = req.body;
      if (follower_user_id === followed_user_id) return res.status(400).json({ message: "Cannot follow yourself" });
      const existing = await Follower.findOne({ where: { follower_user_id, followed_user_id } });
      if (existing) return res.status(400).json({ message: "Already following" });
      const follow = await Follower.create({ follower_user_id, followed_user_id });
      res.status(201).json(follow);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error following user", error: err.message });
    }
  },

  removeFollower: async (req, res) => {
    try {
      const follower_user_id = req.auth.userId;
      const { id } = req.params;
      const follow = await Follower.findOne({ where: { follower_user_id, followed_user_id: id } });
      if (!follow) return res.status(404).json({ message: "Follow not found" });
      await follow.destroy();
      res.status(200).json({ message: "Unfollowed" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error unfollowing", error: err.message });
    }
  },
};

module.exports = FollowerController;
