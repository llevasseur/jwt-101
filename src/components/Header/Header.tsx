import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header-wrapper">
      <header className="header">
        <h2 className="header__title">React Client</h2>
        <div className="header__nav">
          <nav className="nav">
            <Link to="/" className="nav__link">
              Home
            </Link>
            <Link to="/" className="nav__link">
              Profile
            </Link>
            <button className="nav__link">Logout</button>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
