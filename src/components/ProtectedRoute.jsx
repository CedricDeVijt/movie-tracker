import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <p className="text-center text-gray-500 p-8">
          You need to log in to view this page.
        </p>
        <div className="mx-auto w-fit">
          <LoginButton />
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
