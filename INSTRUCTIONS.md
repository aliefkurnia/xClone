# xClone - Twitter Clone

xClone adalah aplikasi kloning Twitter/X yang dibangun dengan React, Node.js, Express, Clerk (Authentication), dan NeonDB (PostgreSQL).

## Tech Stack

- **Backend**: Node.js, Express, Sequelize ORM, PostgreSQL (NeonDB)
- **Frontend**: React.js, Clerk React
- **Authentication**: Clerk
- **Database**: NeonDB (PostgreSQL)

## Fitur

- ? User authentication dengan Clerk
- ? Create, read, update, delete posts
- ? Like posts
- ? Comment on posts
- ? Follow/unfollow users
- ? Direct messages
- ? Retweets
- ? Replies (Tweet threads)
- ? View counts
- ? Real-time feed

## Cara Menjalankan Aplikasi

### Prasyarat

- Node.js (v14 atau lebih baru)
- npm atau yarn
- Akun Clerk (untuk authentication)
- Database NeonDB (PostgreSQL)

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/aliefkurnia/xClone.git
   cd xClone
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd frontend
   npm install
   cd ..
   ```

3. **Konfigurasi Environment Variables**

   File `.env` sudah dikonfigurasi di:
   - `backend/.env` - untuk backend server
   - `frontend/.env` - untuk React app

   Pastikan semua kredensial sudah benar.

### Menjalankan Aplikasi

#### Opsi 1: Menjalankan Backend dan Frontend Secara Manual

**Terminal 1 - Backend Server:**
```bash
cd backend
node server.js
```
Backend akan berjalan di `http://localhost:5001`

**Terminal 2 - Frontend React:**
```bash
cd frontend
npm start
```
Frontend akan berjalan di `http://localhost:3000`

#### Opsi 2: Menggunakan Script Batch (Windows)

**Terminal 1:**
```bash
start-backend.bat
```

**Terminal 2:**
```bash
start-frontend.bat
```

### Akses Aplikasi

Setelah kedua server berjalan, buka browser dan akses:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001/api

## Struktur Project

```
xClone/
+-- backend/
¦   +-- config/          # Konfigurasi database
¦   +-- controllers/     # Business logic
¦   +-- models/          # Database models (Sequelize)
¦   +-- routes/          # API routes
¦   +-- middleware/      # Custom middleware
¦   +-- migrations/      # Database migrations
¦   +-- .env            # Environment variables
¦   +-- server.js       # Entry point backend
+-- frontend/
¦   +-- public/
¦   +-- src/
¦   ¦   +-- assets/      # Images, icons
¦   ¦   +-- components/  # React components
¦   ¦   +-- services/    # API service layer
¦   ¦   +-- App.js
¦   ¦   +-- index.js
¦   +-- .env            # Environment variables
¦   +-- package.json
+-- package.json
+-- start-backend.bat   # Script untuk run backend
+-- start-frontend.bat  # Script untuk run frontend
```

## API Endpoints

### Users
- `GET /api/users/me` - Get current user (auth required)
- `POST /api/users/sync` - Sync user from Clerk (auth required)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/me` - Update current user (auth required)

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post (auth required)
- `PUT /api/posts/:id` - Update post (auth required)
- `DELETE /api/posts/:id` - Delete post (auth required)

### Likes
- `POST /api/likes` - Like a post (auth required)
- `DELETE /api/likes/:id` - Unlike a post (auth required)

### Comments
- `GET /api/posts/:post_id/comments` - Get comments for a post
- `POST /api/comments` - Add comment (auth required)
- `DELETE /api/comments/:id` - Delete comment (auth required)

### Followers
- `POST /api/followers` - Follow user (auth required)
- `DELETE /api/followers/:id` - Unfollow user (auth required)

### Messages
- `GET /api/messages` - Get all messages (auth required)
- `GET /api/messages/:user_id` - Get messages with specific user (auth required)
- `POST /api/messages` - Send message (auth required)

## Troubleshooting

### Port sudah digunakan
Jika port 5001 sudah digunakan, ubah `PORT` di `backend/.env` dan `REACT_APP_API_URL` di `frontend/.env`

### Database connection error
Pastikan `DATABASE_URL` di `backend/.env` benar dan NeonDB dapat diakses.

### Clerk authentication error
Pastikan `CLERK_PUBLISHABLE_KEY` dan `CLERK_SECRET_KEY` sudah benar.

## Kontribusi

Silakan fork repository ini dan buat pull request untuk kontribusi.

## License

MIT
