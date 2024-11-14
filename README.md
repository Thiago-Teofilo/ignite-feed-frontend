# Ignite Feed Frontend - React & Vite

This is the frontend repository for the [Ignite Feed](https://github.com/Thiago-Teofilo/ignite-feed-backend), a blog platform built with React and Vite. The frontend communicates with the backend API to manage user authentication, posts, and other features. 

## Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/) for API communication
- [React Router](https://reactrouter.com/) for navigation
- [JWT](https://jwt.io/) for authentication
- [React Hook Form](https://react-hook-form.com/) for form management

## Prerequisites

Make sure you have the following tools installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Setup and Running

### 1. Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 2. Environment Configuration

Create a `.env` file at the root of the project and define the following environment variable:

```env
VITE_BACKEND_URL="http://localhost:3000"
```

This will point the frontend to the correct backend URL.

### 3. Running the Development Server

Run the development server with the following command:

```bash
npm run dev
```

or

```bash
yarn dev
```

The frontend will be available by default at `http://localhost:5173`.

## Features

### Authentication

- **Login**: Users can authenticate using JWT.
- **User Registration**: Users can create a new account and access the blog.
  
### Posts

- **Post List**: View all posts from the backend.
- **Post Creation**: Logged-in users can create new posts.
- **Post Editing**: Users can edit their existing posts.

### Photo Upload

- Users can upload photos through the frontend interface.

## API Integration

This frontend is integrated with the [Ignite Feed Backend](https://github.com/Thiago-Teofilo/ignite-feed-backend). Make sure the backend API is running and accessible at the URL configured in the `.env` file.

## Development

This project uses Vite as the build tool for a fast and modern development experience. You can start the development server, make changes, and see updates instantly.

### Available Scripts

- `npm run dev` or `yarn dev`: Starts the development server.
- `npm run build` or `yarn build`: Builds the project for production.
- `npm run preview` or `yarn preview`: Previews the production build locally.
