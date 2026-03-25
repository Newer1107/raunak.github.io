# Flashcard App

## Overview

A web-based flashcard application for creating, managing, and studying custom flashcards. Users can register, verify their email, create flashcards, import flashcards from CSV, and take AI-powered quizzes. Includes an admin panel for user management.

The application targets students, educators, and self-learners who need a personalized study tool with automated quiz evaluation.

## Key Features

- User registration with email verification (24-hour token expiry)
- Secure authentication with password hashing (bcrypt)
- Flashcard CRUD operations
- CSV import for bulk flashcard creation
- AI-powered quiz mode with randomized questions
- Quiz answer evaluation using Google Gemini AI
- Admin dashboard for user management
- Admin capabilities: view all users, toggle admin status, delete users, view user flashcards
- Session-based authentication with configurable expiry
- Email notifications via Nodemailer

## Tech Stack

**Backend:**
- Node.js
- Express.js
- EJS (templating engine)

**Database:**
- MySQL (via mysql2 driver)

**Authentication & Security:**
- bcrypt (password hashing)
- express-session (session management)
- crypto (token generation)

**External Services:**
- Google Generative AI (Gemini 1.5 Flash) - quiz answer evaluation
- Nodemailer - email verification

**Other Dependencies:**
- body-parser
- dotenv
- node-fetch

## Project Structure

```
Flashcard-App/
├── server.js              # Application entry point, Express server setup
├── db.js                  # MySQL database connection configuration
├── package.json           # Project dependencies and scripts
├── middleware/
│   └── admin.js          # Admin authorization middleware
├── routes/
│   ├── auth.js           # Authentication routes (signup, login, logout, verification)
│   ├── flashcards.js     # Flashcard CRUD and CSV import routes
│   ├── quiz.js           # Quiz start and answer evaluation routes
│   └── admin.js          # Admin panel routes (user management)
├── utils/
│   └── emailSender.js    # Email verification sender (Nodemailer)
└── views/
    ├── signup.ejs
    ├── login.ejs
    ├── dashboard.ejs      # User flashcard dashboard
    ├── quiz.ejs           # Quiz interface
    ├── verification-success.ejs
    └── admin/
        ├── dashboard.ejs        # Admin user management panel
        └── user-flashcards.ejs  # View specific user's flashcards
```

## Setup & Installation

### Prerequisites

- Node.js (v14 or higher recommended)
- MySQL server
- Gmail account (for email verification) or other SMTP service
- Google AI API key (for Gemini AI integration)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Flashcard-App
```

2. Install dependencies:
```bash
npm install
```

3. Set up the MySQL database:

Create a new database and the following tables:

```sql
CREATE DATABASE flashcard_db;
USE flashcard_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    token_expires DATETIME,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE flashcards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=flashcard_db

# Session
SESSION_SECRET=your_random_session_secret_here

# Email (Gmail example)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
BASE_URL=http://localhost:3000

# Google AI
GOOGLE_API_KEY=your_google_ai_api_key
```

**Important Notes:**
- `SESSION_SECRET`: Generate a secure random string (e.g., 32+ characters)
- `EMAIL_PASS`: Use Gmail App Password, not your regular Gmail password
- `GOOGLE_API_KEY`: Obtain from Google AI Studio (https://makersuite.google.com/app/apikey)
- `BASE_URL`: Change to your production URL when deploying

## Running the Project

### Development Mode

```bash
npm start
```

The server will start at `http://localhost:3000` (or the port specified in `.env`).

### Production Mode

Set `NODE_ENV=production` in your `.env` file and run:

```bash
npm start
```

## Usage

### User Workflow

1. **Registration:**
   - Navigate to `/signup`
   - Enter username, email, and password (minimum 8 characters)
   - Verify email via link sent to inbox (valid for 24 hours)

2. **Login:**
   - Navigate to `/login`
   - Enter verified email and password
   - Redirects to flashcard dashboard

3. **Flashcard Management:**
   - View all personal flashcards at `/flashcards/dashboard`
   - Add flashcards via form (question/answer pairs)
   - Delete individual flashcards
   - Import flashcards via CSV (format: `question,answer` per line)

4. **Quiz Mode:**
   - Start quiz from dashboard
   - Flashcards presented in random order
   - Submit answers for AI evaluation
   - Receive AI-generated feedback on correctness

### Admin Workflow

1. Set `is_admin = TRUE` for a user in the database manually
2. Login as admin user
3. Access admin dashboard at `/admin/dashboard`
4. Manage users:
   - View all registered users
   - Toggle admin status for any user
   - Delete users (cascades to their flashcards)
   - View flashcards for any user

### API Endpoints

**Authentication:**
- `GET /signup` - Signup page
- `POST /signup` - Create new account
- `GET /verify-email?token=<token>` - Email verification
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /logout` - Destroy session

**Flashcards (requires authentication):**
- `GET /flashcards/dashboard` - View user flashcards
- `POST /flashcards/add` - Add new flashcard
- `POST /flashcards/delete/:id` - Delete flashcard
- `POST /flashcards/import` - Bulk import from CSV

**Quiz (requires authentication):**
- `GET /quiz/start` - Start randomized quiz
- `POST /quiz/answer` - Submit answer for AI evaluation

**Admin (requires admin privileges):**
- `GET /admin/dashboard` - Admin panel
- `POST /admin/toggle-admin/:id` - Toggle user admin status
- `POST /admin/delete-user/:id` - Delete user and their flashcards
- `GET /admin/user/:id/flashcards` - View specific user's flashcards

## Known Limitations / Assumptions

- Email verification currently requires Gmail SMTP (can be adapted to other providers)
- No password reset functionality implemented
- Quiz evaluation relies on Google AI API availability and rate limits
- CSV import format is rigid (comma-separated, no header row support)
- No flashcard editing - must delete and recreate
- Admin users must be created manually via database
- Session storage is in-memory (not suitable for multi-instance deployments)
- No database schema migration system - manual SQL setup required
- Error pages for verification issues reference non-existent `verification-error.ejs` view

## Future Improvements

- Implement password reset flow
- Add flashcard edit functionality
- Support multiple CSV formats and validation
- Implement persistent session storage (Redis)
- Add database migration system
- Create first admin user via CLI or installation script
- Add quiz statistics and progress tracking
- Implement spaced repetition algorithm
- Add flashcard categories/tags
- Export flashcards to CSV

## License

License not specified
