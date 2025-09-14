import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css'
import Home from "./pages/Home.jsx";
import Watched from "./pages/Watched.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import Movie from "./pages/Movie.jsx";

import Navbar from "./components/Navbar.jsx";

function App() {
    return (
        <Router>
            <Navbar onSearch={(results) => console.log(results)}/> {/* Update with real handler */}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/watched" element={<Watched/>}/>
                <Route path="/watchlist" element={<Watchlist/>}/>
                <Route path="/movie/:id" element={<Movie/>}/>
            </Routes>
        </Router>
    );
}

export default App