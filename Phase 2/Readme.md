
# Smart Local Service Orchestrator – Phase 2

## Overview

Phase 2 focuses on building the backend authentication system and protecting API endpoints.

The application allows users to register, verify their email, log in securely, receive JWT tokens, and access only the resources that belong to them.

This phase was developed using FastAPI, SQLAlchemy, MySQL, and JWT authentication.

---

live_demo:
https://drive.google.com/file/d/1lCVZRc93Qbx-ggEVWi1ls0iEhxLQ8SVY/view?usp=sharing

# Tech Stack

- Python 3
- FastAPI
- SQLAlchemy
- MySQL
- PyMySQL
- JWT (python-jose)
- Passlib (bcrypt)
- Pydantic
- Uvicorn
- Swagger UI

---

# Features Implemented

## Authentication

- User Registration
- Email Verification
- Secure Password Hashing (bcrypt)
- User Login
- JWT Access Token Generation
- Refresh Token Endpoint
- Logout Endpoint
- Forgot Password
- Reset Password

---

## Authorization

- JWT Token Verification
- Protected Routes
- Current User Authentication
- Data Integrity Guards
- Users can only access their own bookings

---

## Booking APIs

- View My Bookings
- View Booking Details

---

## Health APIs

- Home Endpoint
- Health Check Endpoint

---

# Project Structure

```
Phase 2/
│
├── app/
│   ├── routes/
│   │   ├── auth.py
│   │   └── bookings.py
│   │
│   ├── auth.py
│   ├── config.py
│   ├── database.py
│   ├── dependencies.py
│   ├── models.py
│   ├── schemas.py
│   └── main.py
│
├── .env
├── .env.example
├── requirements.txt
├── .gitignore
└── README.md
```

---

# Environment Variables

Create a `.env` file.

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=smart_service

SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

# Installation

Clone the repository.

```bash
git clone <repository-link>
```

Install dependencies.

```bash
pip install -r requirements.txt
```

---

# Run the Server

```bash
python -m uvicorn app.main:app --reload
```

Server:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/register | Register a new user |
| GET | /auth/verify-email | Verify email |
| POST | /auth/login | Login user |
| POST | /auth/refresh | Refresh access token |
| POST | /auth/logout | Logout |
| POST | /auth/forgot-password | Forgot password |
| POST | /auth/reset-password | Reset password |

---

## Bookings

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /bookings/my-bookings | View logged-in user's bookings |
| GET | /bookings/{booking_id} | View booking details |

---

## System

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | / | Home |
| GET | /health | Health Check |

---

# Security Features

- Passwords are stored as hashed values using bcrypt.
- JWT tokens are used for authentication.
- Protected endpoints require a valid access token.
- Email verification prevents unauthorized account activation.
- Refresh tokens provide secure session management.
- Password reset functionality is available.
- Users can only access data associated with their own account.

---

# Testing

The APIs were tested using FastAPI Swagger UI.

The following scenarios were successfully verified:

- User Registration
- Duplicate Registration
- Email Verification
- Login
- Invalid Login
- Protected Routes
- JWT Authentication
- Refresh Token
- Logout
- Forgot Password
- Reset Password
- Booking Authorization
- Health Endpoint

---

# Database

Database: **MySQL**

Tables include:

- Users
- Providers
- Bookings

SQLAlchemy ORM is used for database interaction.

---

# Phase 2 Deliverables Completed

- Secure Authentication System
- Email Verification
- Password Hashing
- JWT Authentication
- Refresh Token Support
- Logout Endpoint
- Password Reset Workflow
- Protected Routes
- User Authorization
- Data Integrity Guards
- Swagger API Documentation
- MySQL Database Integration

---

# Future Enhancements

- OTP-based Email Verification
- SMS Verification
- Multi-factor Authentication (MFA)
- Role-Based Access Control
- AI-powered Service Matching
- Booking Notifications
- Mobile Application Integration

---

## Author

**Syeda Maham Fatima**

**Project:** Smart Local Service Orchestrator

**Track:** Advanced

**Phase:** 2
