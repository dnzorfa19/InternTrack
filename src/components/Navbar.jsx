
import { Link, useLocation } from "react-router-dom";

function Navbar({ onLogout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="it-navbar">
      <div className="it-navbar-inner">
        <Link to="/" className="it-brand">
          <span className="it-brand-icon">I</span>
          <span className="it-brand-text">
            Intern<span>Track</span>
            <small>CAREER WORKSPACE</small>
          </span>
        </Link>

        <div className="it-nav-links">
          <Link
            to="/"
            className={`it-nav-link ${isActive("/") ? "active" : ""}`}
          >
            <span className="it-nav-icon">▦</span>
            Dashboard
          </Link>

          <Link
            to="/applications"
            className={`it-nav-link ${
              isActive("/applications") ? "active" : ""
            }`}
          >
            <span className="it-nav-icon">▤</span>
            Applications
          </Link>
        </div>

        <button
          type="button"
          className="it-logout-button"
          onClick={onLogout}
        >
          <span>↪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
