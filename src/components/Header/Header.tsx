import { Link } from "react-router-dom";
import "./Header.scss";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div className="header-wrapper">
      <header className="header">
        <h2 className="header__title">React Client</h2>

        <div className="header__nav">
          <nav className="nav">
            <Link to="/" className="nav__link">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/" className="nav__link">
                  Profile
                </Link>
                <button className="nav__link" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav__link" to="/login">
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
