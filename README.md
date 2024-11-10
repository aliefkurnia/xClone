# xClone - Twitter Clone

xClone adalah proyek kloning dari platform Twitter (atau X) yang menggunakan berbagai teknologi modern. Dalam proyek ini, Anda akan membangun sebuah aplikasi dengan fitur dasar seperti posting tweet, mengikuti pengguna, dan berinteraksi dengan timeline.

## Stack Teknologi

Proyek ini dibangun dengan menggunakan stack berikut:

- **Backend**:
  - **Node.js** dengan **Express** untuk membangun RESTful API.
  - **Sequelize** sebagai ORM untuk berinteraksi dengan database **PostgreSQL**.
  - **Bcrypt.js** untuk enkripsi password.
  - **Morgan** untuk logging HTTP requests.
  
- **Frontend**:
  - **React.js** untuk membangun user interface yang interaktif.
  - **ReactDOM** untuk rendering aplikasi di browser.

- **Database**:
  - **PostgreSQL** untuk menyimpan data pengguna, tweet, dan interaksi lainnya.

## Fitur

- Pengguna dapat mendaftar dan masuk ke aplikasi menggunakan email dan password.
- Pengguna dapat membuat, melihat, dan menghapus tweet.
- Pengguna dapat mengikuti dan berhenti mengikuti pengguna lain.
- Pengguna dapat melihat timeline yang berisi tweet dari pengguna yang mereka ikuti.

## Instalasi

Untuk memulai proyek ini, Anda perlu menginstal dependensi backend dan frontend secara terpisah.

### 1. Instalasi Backend (Server)

1. Clone repositori ini:

   ```bash
   git clone https://github.com/aliefkurnia/xClone.git
2. Masuk ke direktori backend:

    Copy code
    ```bash
    cd xClone/backend
3. Instal dependensi:

    Copy code
    ```bash
    npm install
4. Konfigurasikan database PostgreSQL di file config/config.json.

5. Jalankan migrasi database untuk membuat tabel:

Copy code
```bash
npx sequelize-cli db:migrate
```
Jalankan server:
Copy code
```bash
npm start
Server backend akan berjalan di http://localhost:5000.
```
### 2. Instalasi Frontend (React App)
1. Pindah ke direktori frontend:

Copy code
```bash
cd xClone/frontend
```
2.Instal dependensi:
Copy code
```bash
npm install
```
3. Jalankan aplikasi React:
Copy code
```bash
npm start
Aplikasi React akan berjalan di http://localhost:3000.
```
Menjalankan Aplikasi
Setelah menginstal dan menjalankan server backend dan aplikasi frontend, Anda bisa mengakses aplikasi di browser melalui URL:

Frontend: http://localhost:3000
Backend: http://localhost:5000
Pengujian
Untuk menguji aplikasi, Anda bisa menjalankan unit test dengan perintah berikut di direktori backend:

bash
```Copy code
npm test
```
## Struktur Proyek
### Backend
config: Konfigurasi untuk database dan aplikasi.
controllers: Berisi logika untuk menangani HTTP requests.
models: Model database yang berinteraksi dengan PostgreSQL menggunakan Sequelize.
routes: Menyediakan endpoint untuk API.
middleware: Middleware untuk autentikasi dan logging (seperti morgan).
utils: Fungsi utilitas seperti enkripsi password dengan bcrypt.
### Frontend
src:
components: Komponen React untuk membangun UI.
services: Fungsi untuk berinteraksi dengan API backend.
App.js: File utama aplikasi React.
index.js: Entry point untuk aplikasi React.
Kontribusi
Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori ini dan buat pull request dengan deskripsi perubahan yang Anda buat.
