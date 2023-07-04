import "./styles.css";

import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as CancelIcon } from "../../assets/icons/cancel.svg";
import NavCategories from "components/NavCategories";
import { ReactComponent as LoginIcon } from "../../assets/icons/login.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "AuthContext";
import { getTokenData, isAuthenticated } from "utils/auth";
import { removeAuthData } from "utils/storage";

type Props = {
  onSearch: Function;
};

export default function Navbar({ onSearch }: Props) {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const [text, setText] = useState("");

  function handleChange(event: any) {
    setText(event.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    onSearch(text);
  }

  function handleResetClick() {
    setText("");
    onSearch(text);
  }

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });

    navigate("/");
  }

  return (
    <header>
      <nav className="navbar navbar-expand-md bg-secondary main-nav">
        <div className="container d-flex justify-content-between container-nav-bar">
          <div className="container-logo">
            <Link to="/">
              <img src={Logo} alt="Logo da empresa" />
            </Link>
          </div>

          <div className="search-bar">
            <form onSubmit={handleSubmit}>
              <input
                value={text}
                type="text"
                placeholder="Nome do produto"
                className="base-inputs"
                onChange={handleChange}
              />
              <button type="submit">
                <SearchIcon />
              </button>
              <button
                className={`text-danger ${
                  text.length === 0 ? "d-none" : "d-block"
                }`}
                onClick={handleResetClick}
              >
                <CancelIcon />
              </button>
            </form>
          </div>

          <div className="login-logout-icon">
            {authContextData.authenticated ? (
              <a href="#logout" onClick={handleClick}>
                <LogoutIcon />
              </a>
            ) : (
              <Link to="/login">
                <LoginIcon />
              </Link>
            )}
          </div>
        </div>
      </nav>

      <NavCategories />
    </header>
  );
}
