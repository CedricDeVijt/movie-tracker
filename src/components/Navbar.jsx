import SearchBar from "./SearchBar";
import { NavLink, useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton.jsx";

function Navbar() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side: Logo/Title and Navigation Links */}
        <div className="flex items-center space-x-8">
          <div className="text-white text-xl font-bold">
            <NavLink to="/">Movie Tracker</NavLink>
          </div>
          <div className="flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white hover:text-gray-300 ${isActive ? "font-bold italic" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/watched"
              className={({ isActive }) =>
                `text-white hover:text-gray-300 ${isActive ? "font-bold italic" : ""}`
              }
            >
              Watched
            </NavLink>
            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                `text-white hover:text-gray-300 ${isActive ? "font-bold italic" : ""}`
              }
            >
              Watchlist
            </NavLink>
          </div>
        </div>
        {/* Right side: Search Bar and Login */}
        <div className="flex items-center space-x-4">
          <SearchBar onSearch={handleSearch} />

          <LoginButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
