import "./styles.css";

import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as CancelIcon } from '../../assets/icons/cancel.svg';
import NavCategories from "components/NavCategories";
import { ReactComponent as LoginIcon } from "../../assets/icons/login.svg";
import { useState } from "react";

type Props = {
  onSearch: Function;
};

export default function Navbar({ onSearch }: Props) {
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
              <button className={`text-danger ${text.length === 0 ? 'd-none' : 'd-block'}`} onClick={handleResetClick}>
                <CancelIcon />
              </button>
            </form>
          </div>

          <div className="login-icon">
            <Link to="/login">
              <LoginIcon />
            </Link>
          </div>
        </div>
      </nav>

      <NavCategories />
    </header>
  );
}
