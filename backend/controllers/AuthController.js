const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // Mengimpor User dari models
const { Sequelize } = require("../models"); // Mengimpor Sequelize untuk Op.or

const login = async (req, res) => {
  const { email, password, username } = req.body;

  // Memastikan email atau username dan password diberikan
  if ((!email && !username) || !password) {
    return res
      .status(400)
      .json({ message: "Email/Username and password are required!" });
  }

  try {
    // Validasi apakah username atau email ada dalam request body
    if (!email && !username) {
      return res
        .status(400)
        .json({ message: "Email or username is required!" });
    }

    // Mencari user berdasarkan email atau username
    const user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [
          { email: email || "" }, // Jika email tidak ada, kirim null
          { username: username || "" }, // Jika username tidak ada, kirim null
        ],
      },
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
      { id: user.user_id, email: user.email }, // Menggunakan user_id sebagai id
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err); // Untuk debugging jika terjadi error
    return res.status(500).json({ message: "An error occurred during login." });
  }
};

module.exports = { login };
