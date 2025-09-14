import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css'
import Home from "./pages/Home.jsx";
import Seen from "./pages/Seen.jsx";
import Wishlist from "./pages/Wishlist.jsx";

import Navbar from "./components/Navbar.jsx";

function App() {
    return (
        <Router>
            <Navbar onSearch={(results) => console.log(results)}/> {/* Update with real handler */}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/seen" element={<Seen/>}/>
                <Route path="/wishlist" element={<Wishlist/>}/>
            </Routes>
        </Router>
    );
}

export default App