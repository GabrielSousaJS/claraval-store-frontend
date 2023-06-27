import "./styles.css";

import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import NavCategories from "components/NavCategories";
import { useState } from "react";
import SearchBar from "components/SearchBar";
import { ReactComponent as LoginIcon } from "../../assets/icons/login.svg";

export default function Navbar() {
  const [productName, setProductName] = useState("");

  // Aqui estaria o useEffect para atualizar a lista

  function handleSearch(searchText: string) {
    setProductName(searchText);
  }

  return (
    <header>
      <nav className="navbar navbar-expand-md bg-secondary main-nav">
        <div className="container d-flex justify-content-between">
          <div className="container-logo">
            <Link to="/" className="nav-logo">
              <img src={Logo} alt="Logo da empresa" />
            </Link>
          </div>

          <SearchBar onSearch={handleSearch} />

          <div className="login-icon">
            <Link to='/login'><LoginIcon /></Link>
          </div>
        </div>
      </nav>

      <NavCategories />
    </header>
  );
}
