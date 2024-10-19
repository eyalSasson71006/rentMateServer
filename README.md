# Rent Mate - Backend

Welcome to the **Rent Mate** backend, the server-side logic of our platform designed to connect apartment owners with renters. This server handles user management, apartment listings, and real-time chat functionalities.

## Features

- **User Management**: Registration, login, profile editing, and admin controls for managing users.
- **Apartment Listings**: CRUD operations for apartments, including the ability to toggle availability and add reviews.
- **Real-time Chat**: Real-time communication using **Socket.IO**.
- **Admin Capabilities**: Admin users can manage all apartments and users, edit or delete apartments, and change user roles.

## Technologies & Dependencies

The backend is built using **Node.js** and **Express**, with **MongoDB** as the database. Here’s an overview of the key dependencies:

- **express**: Framework for building the RESTful API.
- **bcryptjs**: For hashing user passwords.
- **jsonwebtoken**: For handling JWT authentication.
- **mongoose**: For interacting with the MongoDB database.
- **cors**: To handle cross-origin requests.
- **dotenv**: To load environment variables from a `.env` file.
- **express-rate-limit**: To limit repeated requests and prevent abuse.
- **socket.io**: For real-time chat functionality.
- **nodemon**: For automatic server restarting during development.

## Collections

The project focuses on three main collections:

1. **Users**: Handles user authentication, registration, and role management.
2. **Apartments**: Manages apartment listings, reviews, and availability status.
3. **Chats**: Supports real-time messaging with a Socket.IO connection.

## Installation Guide

### Prerequisites
- Node.js and MongoDB installed on your machine.

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/eyalSasson71006/rentMateServer.git
    ```
2. Navigate to the project folder:
    ```bash
    cd rentMateServer
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. **Important**: Add the `.env` file to the root folder. This file contains sensitive data, such as JWT secrets and MongoDB connection strings. Ensure it is properly configured before running the project.
5. Run the production server:
    ```bash
    npm start
    ```
6. For development:
    ```bash
    npm run dev
    ```

### Notes:
- In production (`npm start`), the server connects to a MongoDB Atlas instance containing all initial data.
- In development (`npm run dev`), the server connects to a local MongoDB instance, which will start with an empty database.

## Postman API Documentation

You can explore the API through the Postman documentation:
- [Users Endpoints](https://documenter.getpostman.com/view/37787079/2sAXxWZooV)
- [Apartments Endpoints](https://documenter.getpostman.com/view/37787079/2sAXxWZojE)
- [Chats Endpoints](https://documenter.getpostman.com/view/37787079/2sAXxWZooW)

The Postman documentation contains all necessary information for interacting with the API, including request parameters, response formats, and example requests.

## Scripts

- **Production**: Use `npm start` to start the server in production mode. This connects to the MongoDB Atlas instance.
- **Development**: Use `npm run dev` to run the server in development mode with Nodemon for automatic restarts. This connects to a local MongoDB instance.
