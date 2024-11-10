const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { Sequelize } = require("../models");

const login = async (req, res) => {
  const { email, password } = req.body; // Menggunakan 'id' untuk email atau username

  // Memastikan id dan password diberikan
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email/Username and password are required!" });
  }

  // Regex untuk memvalidasi format email
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const whereClause = isEmail ? { email: email } : { username: email };

  try {
    // Mencari user berdasarkan email atau username
    const user = await User.findOne({
      where: whereClause,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Verifikasi password menggunakan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Menghasilkan JWT token
    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      user_id: user.user_id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred during login." });
  }
};

module.exports = { login };
