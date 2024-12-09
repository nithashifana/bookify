# Bookify

A user-friendly web-based library management system designed to efficiently manage books and users. Built with **Express.js** and **MongoDB**, it offers features like user authentication, password security, and protected routes to ensure secure access to sensitive operations.

## Overview

Bookify helps you manage your library with ease. Whether you are an admin or a user, you can add, view, update, and delete books securely. The system also supports user registration, login with JWT authentication, and password hashing for enhanced security.

## Features

- **User Management**:
  - Add new users with details such as name, email, and membership type.
  
- **Authentication**:
  - Secure API endpoints using JSON Web Tokens (JWT) for authentication.
  
- **Password Protection**:
  - Passwords are hashed using bcrypt.js to enhance security.
  
- **Book Management**:
  - Manage books with functionalities to add, view, update, and delete books.
  
- **Protected Routes**:
  - Implemented protected routes to restrict access to sensitive operations like deleting or updating books.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nithashifana/bookify.git
   ```
2. Navigate into the project directory:
   ```bash
   cd bookify
   ```
3. Install the required packages:
   ```bash
   npm install
   ```
4. Create a .env file and set your environment variables for JWT_TOKEN, password, database connection url, etc.
5. Start the server
   ```bash
   node app.js
   ```
## CURL request examples
- **User Registration**:
  - Create a new user:
    ```bash
    curl -X POST https://bookify-sx05.onrender.com/api/auth/register -H "Content-Type: application/json" -d '{ "name": "<name>", "email": "<email>", "password": "<password>", "membershipType": "<regular/premium>" }'
    ```
- **User Login**:
  - Login and receive JWT:
    ```bash
    curl -X POST https://bookify-sx05.onrender.com/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@exa.com", "password": "YOUR_PASSWORD_HERE"}'
    ```
- **Add a new book**:
  - Add a new book to the library:
    ```bash
    curl -X POST https://bookify-sx05.onrender.com/api/books/add -H "Content-Type: application/json" -H "Authorization: Bearer <token>"
    -d '{"title": "<title>", "author": "<author>", "publishedYear": <year>, "genre": "<genre>", "availableCopies": <number>}'
    ```
  

## Technologies Used
- Node.js
- Express.js
- JWT for secure authentication
- bcrypt.js for password hashing
- MongoDB for database management
  
## Deployment
The backend server is hosted on Render. You can access it at:
> https://bookify-sx05.onrender.com/

## License
This project is licensed under the MIT License.
[MIT License](LICENSE)

