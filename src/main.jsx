import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));
const AUTH0_DOMAIN = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;

// Validate environment variables
if (!AUTH0_DOMAIN || !CLIENT_ID) {
  console.error(
    "Auth0 configuration missing. Check VITE_APP_AUTH0_DOMAIN and VITE_APP_AUTH0_CLIENT_ID in your .env file.",
  );
}

// Configure Auth0Provider with additional parameters for local development
root.render(
  <Auth0Provider
    domain={AUTH0_DOMAIN}
    clientId={CLIENT_ID}
    authorizationParams={{
      redirect_uri: "http://localhost:5173",
      scope: "openid profile email"
    }}
    cacheLocation="localstorage" // Persist auth state in localStorage
    useRefreshTokens // Enable refresh tokens for better session management
  >
    <App />
  </Auth0Provider>,
);
