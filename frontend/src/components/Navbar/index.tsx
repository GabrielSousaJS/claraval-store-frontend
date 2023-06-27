import "./styles.css";

import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import NavCategories from "components/NavCategories";

export default function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-md bg-secondary main-nav">
        <div className="container">
          <div className="container-logo">
            <Link to="/" className="nav-logo">
              <img src={Logo} alt="Logo da empresa" />
            </Link>
          </div>
        </div>
      </nav>

      <NavCategories />
    </header>
  );
}
