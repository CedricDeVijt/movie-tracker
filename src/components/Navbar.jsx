import SearchBar from "./SearchBar";

import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo/Title */}
        <div className="text-white text-xl font-bold">
          <NavLink to="/">Movie Tracker</NavLink>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
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

        <SearchBar onSearch={handleSearch} />
      </div>
    </nav>
  );
}

export default Navbar;
