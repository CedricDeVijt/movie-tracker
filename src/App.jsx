import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Watched from "./pages/Watched.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import Movie from "./pages/Movie.jsx";
import SearchResult from "./pages/SearchResult.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar onSearch={(results) => console.log(results)} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/watched"
              element={
                <ProtectedRoute>
                  <Watched />
                </ProtectedRoute>
              }
            />
            <Route
              path="/watchlist"
              element={
                <ProtectedRoute>
                  <Watchlist />
                </ProtectedRoute>
              }
            />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/search" element={<SearchResult />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
