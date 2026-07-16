const { User, Follower, Post, Like, Comment } = require("../models");
const { Op } = require("sequelize");

const UserController = {
  syncUser: async (req, res) => {
    try {
      const clerkUserId = req.auth.userId;
      let user = await User.findByPk(clerkUserId);

      if (!user) {
        const { name, username, email, profile_picture } = req.body;

        if (!name || !username) {
          return res.status(400).json({
            message: "Missing required fields: name and username",
          });
        }

        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
          return res.status(400).json({ message: "Username has already been taken." });
        }

        user = await User.create({
          user_id: clerkUserId,
          name,
          username,
          email,
          profile_picture: profile_picture || "https://picsum.photos/200",
        });
      }

      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error syncing user", error: err.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching users", error: err.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const followersCount = await Follower.count({ where: { followed_user_id: user.user_id } });
      const followingCount = await Follower.count({ where: { follower_user_id: user.user_id } });

      res.status(200).json({
        ...user.toJSON(),
        followers_count: followersCount,
        following_count: followingCount,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching user", error: err.message });
    }
  },

  getUserByUsername: async (req, res) => {
    try {
      const user = await User.findOne({ where: { username: req.params.username } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const followersCount = await Follower.count({ where: { followed_user_id: user.user_id } });
      const followingCount = await Follower.count({ where: { follower_user_id: user.user_id } });

      res.status(200).json({
        ...user.toJSON(),
        followers_count: followersCount,
        following_count: followingCount,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching user", error: err.message });
    }
  },

  getUserPosts: async (req, res) => {
    try {
      const user = await User.findOne({ where: { username: req.params.username } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const posts = await Post.findAll({
        where: { user_id: user.user_id, parent_post_id: null },
        include: [
          { model: User, as: "user", attributes: ["user_id", "name", "username", "profile_picture", "is_premium"] },
          { model: Like, as: "likes", attributes: ["like_id", "user_id"] },
          { model: Comment, as: "comments", attributes: ["comment_id"] },
          { model: Post, as: "retweets", attributes: ["post_id"] },
          {
            model: Post, as: "originalPost",
            include: [{ model: User, as: "user", attributes: ["user_id", "name", "username", "profile_picture"] }],
          },
        ],
        order: [["created_at", "DESC"]],
      });

      const postsWithCounts = posts.map((post) => {
        const postData = post.toJSON();
        return {
          ...postData,
          likes_count: postData.likes?.length || 0,
          comments_count: postData.comments?.length || 0,
          retweets_count: postData.retweets?.length || 0,
        };
      });

      res.status(200).json(postsWithCounts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching user posts", error: err.message });
    }
  },

  getMe: async (req, res) => {
    try {
      const user = await User.findByPk(req.auth.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found. Please sync first." });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching user", error: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.auth.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { name, username, bio, profile_picture } = req.body;

      if (username && username !== user.username) {
        const existingUsername = await User.findOne({
          where: { username, user_id: { [Op.ne]: user.user_id } },
        });
        if (existingUsername) {
          return res.status(400).json({ message: "Username has already been taken." });
        }
      }

      await user.update({ name, username, bio, profile_picture });
      res.status(200).json({ message: "User updated successfully", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating user", error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.auth.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting user", error: err.message });
    }
  },

  searchUsers: async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || q.trim().length === 0) {
        return res.status(200).json([]);
      }
      const users = await User.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${q}%` } },
            { username: { [Op.iLike]: `%${q}%` } },
          ],
        },
        attributes: ["user_id", "name", "username", "profile_picture", "bio"],
        limit: 10,
      });
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error searching users", error: err.message });
    }
  },

  getSuggestedUsers: async (req, res) => {
    try {
      const currentUserId = req.auth.userId;
      const following = await Follower.findAll({
        where: { follower_user_id: currentUserId },
        attributes: ["followed_user_id"],
      });
      const followingIds = following.map((f) => f.followed_user_id);
      followingIds.push(currentUserId);

      const users = await User.findAll({
        where: {
          user_id: { [Op.notIn]: followingIds },
        },
        attributes: ["user_id", "name", "username", "profile_picture", "bio"],
        limit: 5,
        order: [["created_at", "DESC"]],
      });
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching suggested users", error: err.message });
    }
  },
};

module.exports = UserController;
