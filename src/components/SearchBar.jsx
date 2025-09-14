import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        const results = await onSearch(searchTerm);
        setSearchTerm("");
      } catch (error) {
        setSearchTerm("");
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="mt-4 md:mt-0 w-full md:w-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies..."
        className="px-3 py-2 rounded-l-md bg-gray-700 text-white border-none focus:outline-none"
      />
      <button
        type="submit"
        className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
