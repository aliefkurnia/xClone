const express = require("express");
const cors = require("cors"); // Import cors
const app = express();
const { sequelize } = require("./models");

// Memuat variabel lingkungan dari file .env
require("dotenv").config();

// Menggunakan middleware CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Izinkan frontend di localhost:3000
    methods: ["GET", "POST", "PUT", "DELETE"], // Metode HTTP yang diizinkan
    allowedHeaders: ["Content-Type", "Authorization"], // Header yang diizinkan
  })
);

// Middleware untuk parsing body
app.use(express.json());

// Menyambungkan routes
const routes = require("./routes/routes");
app.use("/api", routes);

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);

  // Sinkronisasi database
  //   sequelize.sync({ force: false }).then(() => {
  //     console.log("Database & tabel berhasil disinkronkan!");
  //   });
});
