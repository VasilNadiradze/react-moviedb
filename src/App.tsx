import NavBar from "./components/NavBar";
import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<h2>404 - გვერდი ვერ მოიძებნა</h2>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
