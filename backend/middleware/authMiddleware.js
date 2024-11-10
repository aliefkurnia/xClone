const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Akses ditolak, token tidak ditemukan!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Menyimpan informasi pengguna yang sudah terverifikasi ke dalam request
    next();
  } catch (err) {
    res.status(400).json({ message: "Token tidak valid!" });
  }
};

module.exports = authMiddleware;
