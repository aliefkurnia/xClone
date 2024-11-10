// backend/controllers/UserController.js
const { User } = require("../models");

const UserController = {
  // Membuat pengguna baru
  createUser: async (req, res) => {
    try {
      const { username, email, password, bio, profile_picture } = req.body;
      console.log(req.body);

      // Periksa apakah ada field yang hilang
      if (!username || !email || !password) {
        return res.status(400).json({
          message: "Missing required fields: username, email, and password",
        });
      }

      const user = await User.create({
        username,
        email,
        password,
        bio,
        profile_picture,
      });

      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: "Error creating user", error: err });
    }
  },

  // Membaca semua pengguna
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Error fetching users", error: err });
    }
  },

  // Membaca satu pengguna berdasarkan ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Error fetching user", error: err });
    }
  },

  // Memperbarui pengguna
  updateUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { username, email, password, bio, profile_picture } = req.body;
      await user.update({
        username,
        email,
        password,
        bio,
        profile_picture,
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Error updating user", error: err });
    }
  },

  // Menghapus pengguna
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting user", error: err });
    }
  },
};

module.exports = UserController;
