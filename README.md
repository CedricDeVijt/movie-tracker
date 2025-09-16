# Movie Tracker

A React-based movie tracking application that allows users to discover movies, maintain watchlists, and track watched movies. This project was built as a learning exercise to gain experience with modern frontend development, third-party API integration, and user authentication.

## Project Goals

The primary goal of this project was to build a frontend-focused application using React while exploring modern web development practices. Since I have extensive backend development experience, I chose to use external services (TMDB API for movie data, Auth0 for authentication, and Supabase for data persistence) to focus purely on frontend development.

## Features

- **Movie Discovery**: Browse popular, top-rated, and upcoming movies
- **Search Functionality**: Search for movies using TMDB's extensive database
- **User Authentication**: Secure login/logout using Auth0
- **Personal Lists**: Create and manage watched movies and watchlist
- **Movie Details**: View detailed information about movies including ratings, genres, runtime, and budget
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Smooth Animations**: Enhanced user experience with Framer Motion animations

## Tech Stack

### Frontend

- **React** - Core UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API requests

### External Services

- **TMDB API** - Movie database and information
- **Auth0** - Authentication and user management
- **Supabase** - Database for user lists and preferences

### Build Tools

- **Vite** - Fast build tool and development server
- **ESLint** - Code linting

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd movie-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APP_AUTH0_DOMAIN=your_auth0_domain
VITE_APP_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_APP_AUTH0_AUDIENCE=your_auth0_api_identifier
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

4. Start the development server:

```bash
npm run dev
```

## API Integration

### TMDB (The Movie Database)

Used for all movie-related data including:

- Movie search and discovery
- Movie details, ratings, and metadata
- Popular, top-rated, and upcoming movies
- Movie posters and images

### Auth0

Handles user authentication with:

- Social login providers
- JWT token management
- User session persistence
- Protected route access

### Supabase

Stores user-specific data:

- Watched movies list
- Watchlist entries

## Known Limitations & Scope Considerations

Since this project was built as a **frontend-only learning exercise**, several architectural decisions were made that would not be suitable for a production environment:

### Authentication Architecture

- **Current Implementation**: Auth0 tokens are passed directly to Supabase from the frontend
- **Production Concern**: This exposes authentication logic and potentially sensitive data to the client
- **Proper Solution**: Would require a backend API to handle Auth0 token validation and Supabase operations securely

### Data Management

- **Current Implementation**: Direct Supabase calls from React components
- **Production Concern**: Database schema and queries are exposed to the frontend
- **Proper Solution**: Backend API with proper data validation, sanitization, and business logic

### Security

- **Current Implementation**: API keys and configuration stored in frontend environment variables
- **Production Concern**: All environment variables are bundled and visible in the client
- **Proper Solution**: Backend proxy for external APIs and secure credential management

### Error Handling

- **Current Implementation**: Basic error logging to console
- **Production Concern**: Limited user feedback and no centralized error monitoring
- **Proper Solution**: Comprehensive error boundaries, user notifications, and error tracking

### State Management

- **Current Implementation**: Component-level state and custom hooks
- **Production Concern**: No centralized state management for complex data flows
- **Proper Solution**: Redux, Zustand, or similar state management library for larger applications

## Environment Setup

You'll need to set up accounts and obtain API keys from:

1. **TMDB**: Create an account at [themoviedb.org](https://www.themoviedb.org/) and request an API key
2. **Auth0**: Set up an application at [auth0.com](https://auth0.com/)
3. **Supabase**: Create a project at [supabase.com](https://supabase.com/)

## Learning Outcomes

This project helped me gain experience with:

- Modern React patterns and hooks
- Frontend routing and navigation
- Third-party API integration
- User authentication flows
- Responsive design with Tailwind CSS
- Animation and user experience design
- State management patterns
- Build tools and development workflow

**Note**: This is a learning project focused on frontend development. The architecture choices prioritize learning and experimentation over production-ready patterns. In a real-world scenario, many of these integrations would be handled through a proper backend API with appropriate security measures.
