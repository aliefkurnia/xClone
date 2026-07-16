const { Post, User, Like, Comment } = require("../models");
const { Op, fn, col, literal } = require("sequelize");

const PostController = {
  createPost: async (req, res) => {
    try {
      const user_id = req.auth.userId;
      const { content, media_url, parent_post_id, retweet_of_post_id } = req.body;

      if (!retweet_of_post_id && !content) {
        return res.status(400).json({ message: "Content is required for non-retweet posts" });
      }

      const post = await Post.create({
        user_id,
        content,
        media_url,
        parent_post_id,
        retweet_of_post_id,
      });

      const fullPost = await Post.findByPk(post.post_id, {
        include: [
          { model: User, as: "user", attributes: ["user_id", "name", "username", "profile_picture"] },
          { model: Post, as: "originalPost", include: [{ model: User, as: "user" }] },
          { model: Post, as: "parentPost", include: [{ model: User, as: "user" }] },
        ],
      });

      res.status(201).json(fullPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating post", error: err.message });
    }
  },

  getPosts: async (req, res) => {
    try {
      const currentUserId = req.auth?.userId || null;

      const posts = await Post.findAll({
        where: { parent_post_id: null },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["user_id", "name", "username", "profile_picture"],
          },
          {
            model: Like,
            as: "likes",
            attributes: ["like_id", "user_id"],
          },
          {
            model: Comment,
            as: "comments",
            attributes: ["comment_id"],
          },
          {
            model: Post,
            as: "originalPost",
            include: [
              {
                model: User,
                as: "user",
                attributes: ["user_id", "name", "username", "profile_picture"],
              },
            ],
          },
          {
            model: Post,
            as: "retweets",
            attributes: ["post_id"],
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
          user_liked: currentUserId
            ? postData.likes?.some((l) => l.user_id === currentUserId)
            : false,
        };
      });

      res.status(200).json(postsWithCounts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching posts", error: err.message });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: "user",
            attributes: ["user_id", "name", "username", "profile_picture"],
          },
          {
            model: Like,
            as: "likes",
            attributes: ["like_id", "user_id"],
          },
          {
            model: Comment,
            as: "comments",
            include: [
              {
                model: User,
                as: "user",
                attributes: ["user_id", "name", "username", "profile_picture"],
              },
            ],
          },
          {
            model: Post,
            as: "replies",
            include: [
              {
                model: User,
                as: "user",
                attributes: ["user_id", "name", "username", "profile_picture"],
              },
            ],
          },
          {
            model: Post,
            as: "originalPost",
            include: [
              {
                model: User,
                as: "user",
                attributes: ["user_id", "name", "username", "profile_picture"],
              },
            ],
          },
          {
            model: Post,
            as: "parentPost",
            include: [
              {
                model: User,
                as: "user",
                attributes: ["user_id", "name", "username", "profile_picture"],
              },
            ],
          },
        ],
      });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      await post.increment("view_count");

      const postData = post.toJSON();
      const enrichedPost = {
        ...postData,
        likes_count: postData.likes?.length || 0,
        comments_count: postData.comments?.length || 0,
        retweets_count: postData.retweets?.length || 0,
      };

      res.status(200).json(enrichedPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching post", error: err.message });
    }
  },

  deletePost: async (req, res) => {
    try {
      const user_id = req.auth.userId;
      const post = await Post.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.user_id !== user_id) {
        return res.status(403).json({ message: "Unauthorized to delete this post" });
      }

      await post.destroy();
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting post", error: err.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const user_id = req.auth.userId;
      const { id } = req.params;
      const { content, media_url } = req.body;

      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.user_id !== user_id) {
        return res.status(403).json({ message: "Unauthorized to update this post" });
      }

      post.content = content || post.content;
      post.media_url = media_url || post.media_url;

      await post.save();

      res.status(200).json({ message: "Post updated successfully", post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating post", error: err.message });
    }
  },

  searchPosts: async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || q.trim().length === 0) {
        return res.status(200).json([]);
      }
      const posts = await Post.findAll({
        where: {
          content: { [Op.iLike]: `%${q}%` },
          parent_post_id: null,
        },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["user_id", "name", "username", "profile_picture"],
          },
          { model: Like, as: "likes", attributes: ["like_id", "user_id"] },
          { model: Comment, as: "comments", attributes: ["comment_id"] },
          { model: Post, as: "retweets", attributes: ["post_id"] },
        ],
        order: [["created_at", "DESC"]],
        limit: 20,
      });

      const results = posts.map((post) => {
        const postData = post.toJSON();
        return {
          ...postData,
          likes_count: postData.likes?.length || 0,
          comments_count: postData.comments?.length || 0,
          retweets_count: postData.retweets?.length || 0,
        };
      });

      res.status(200).json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error searching posts", error: err.message });
    }
  },

  getTrending: async (req, res) => {
    try {
      const recentPosts = await Post.findAll({
        where: {
          created_at: {
            [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
          content: { [Op.ne]: null },
        },
        attributes: ["content"],
      });

      const hashtagCounts = {};
      recentPosts.forEach((post) => {
        const hashtags = post.content.match(/#\w+/g);
        if (hashtags) {
          hashtags.forEach((tag) => {
            const lower = tag.toLowerCase();
            hashtagCounts[lower] = (hashtagCounts[lower] || 0) + 1;
          });
        }
      });

      // Also count significant words (3+ occurrences) as topics
      const wordCounts = {};
      recentPosts.forEach((post) => {
        const words = post.content
          .replace(/#\w+/g, "")
          .replace(/https?:\/\/\S+/g, "")
          .split(/\s+/)
          .filter((w) => w.length > 4);
        const unique = [...new Set(words.map((w) => w.toLowerCase()))];
        unique.forEach((word) => {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        });
      });

      const trending = Object.entries(hashtagCounts)
        .map(([tag, count]) => ({
          topic: tag,
          posts: count,
          category: "Trending",
        }))
        .sort((a, b) => b.posts - a.posts)
        .slice(0, 5);

      // If not enough hashtags, fill with popular words
      if (trending.length < 5) {
        const topWords = Object.entries(wordCounts)
          .filter(([_, count]) => count >= 2)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5 - trending.length)
          .map(([word, count]) => ({
            topic: word.charAt(0).toUpperCase() + word.slice(1),
            posts: count,
            category: "Technology · Trending",
          }));
        trending.push(...topWords);
      }

      res.status(200).json(trending);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching trending", error: err.message });
    }
  },
};

module.exports = PostController;
