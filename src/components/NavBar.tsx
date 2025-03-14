import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MDB</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          მთავარი
        </Link>
        <Link to="/favorites" className="nav-link">
          ფავორიტები
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
