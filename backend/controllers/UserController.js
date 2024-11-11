const { User } = require("../models");

const UserController = {
  // Membuat pengguna baru
  createUser: async (req, res) => {
    try {
      const { name, username, email, password, bio, profile_picture } =
        req.body;
      console.log(req.body);

      // Periksa apakah ada field yang hilang
      if (!name || !username || !email || !password) {
        return res.status(400).json({
          message:
            "Missing required fields: name, username, email, and password",
        });
      }

      // Periksa apakah email sudah terdaftar
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email has already been taken." });
      }

      // Buat pengguna baru jika email belum terdaftar
      const user = await User.create({
        name,
        username,
        email,
        password,
        bio,
        profile_picture,
      });

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Error creating user", error: err.message });
    }
  },

  // Membaca semua pengguna
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Error fetching users", error: err.message });
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
      console.error(err);
      res
        .status(500)
        .json({ message: "Error fetching user", error: err.message });
    }
  },

  // Memperbarui pengguna
  updateUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { name, username, email, password, bio, profile_picture } =
        req.body;
      await user.update({
        name,
        username,
        email,
        password,
        bio,
        profile_picture,
      });
      res.status(200).json({
        message: "User updated successfully",
        user,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Error updating user", error: err.message });
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
      console.error(err);
      res
        .status(500)
        .json({ message: "Error deleting user", error: err.message });
    }
  },
};

module.exports = UserController;
