# Fantastic Bassoon

A simple Express.js event management API with authentication, role-based authorization, and Swagger documentation.

## Features

- User registration and login with JWT authentication
- Role-based access control for organizers and attendees
- Event creation, listing, updating, deleting, and attendee registration
- Statistics endpoint for users and events
- Swagger UI documentation available at `/api-docs`

## Requirements

- Node.js 18+ recommended
- npm

## Installation

1. Clone the repository or copy the project files.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with the following values:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
```

## Run the Application

Start the server with:

```bash
npm start
```

The API will be available at `http://localhost:3000` by default.

## API Endpoints

### Auth

- `POST /api/auth/register`
  - Register a new user.
  - Body: `{ "username": "user", "password": "pass", "role": "organizer" }`

- `POST /api/auth/login`
  - Authenticate a user and receive a JWT token.
  - Body: `{ "username": "user", "password": "pass" }`

- `GET /api/auth/user`
  - Get the authenticated user profile.
  - Requires `Authorization: Bearer <token>`

### Events

- `POST /api/events`
  - Create a new event.
  - Requires organizer role.
  - Body: `{ "title": "Event name", "date": "YYYY-MM-DD", "time": "HH:MM", "participants": [] }`

- `GET /api/events`
  - List all events.
  - Requires authentication.

- `PUT /api/events/:id`
  - Update an event by ID.
  - Requires organizer role and ownership of the event.

- `DELETE /api/events/:id`
  - Delete an event by ID.
  - Requires organizer role and ownership.

- `POST /api/events/:id/register`
  - Register the authenticated attendee for the event.
  - Requires attendee role.

### Stats

- `GET /api/stats`
  - Retrieve event and user statistics.
  - Requires authentication.

## Swagger Documentation

- Swagger UI: `http://localhost:3000/api-docs`
- Swagger JSON: `http://localhost:3000/api-docs-json`

## Notes

- This project uses in-memory storage for users and events, so data is reset when the server restarts.
- Passwords are hashed with bcrypt.
- JWT authentication is required for protected routes.

## Project Structure

- `index.js` - Main server entry point
- `routes/` - Route definitions
- `controllers/` - Request handlers and business logic
- `middleware/` - Authentication and authorization middleware
- `models/` - In-memory data models for users and events
