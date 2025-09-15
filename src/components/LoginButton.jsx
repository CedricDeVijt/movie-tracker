import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <button
        className="px-3 py-2 rounded-md bg-gray-700 text-white"
        onClick={() => {
          window.location.href = "/"; // Redirect to home page after logout
          window.localStorage.clear(); // Clear local storage to remove cached tokens
          window.location.reload(); // Reload the page to reset the app state
        }}
      >
        Log Out
      </button>
    );
  }

  return (
    <button
      className="px-3 py-2 rounded-md bg-gray-700 text-white"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
