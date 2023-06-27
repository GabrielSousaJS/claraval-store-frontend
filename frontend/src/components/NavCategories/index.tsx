import "./styles.css";
import { NavLink } from "react-router-dom";

export default function NavCategories() {
  return (
    <div className="bg-secondary container-category">
      <div className="container">
        <ul className="main-menu">
          <li>
            <NavLink to="/categories/1">Eletrônicos</NavLink>
          </li>
          <li>
            <NavLink to="/categories/2">Vestuário</NavLink>
          </li>
          <li>
            <NavLink to="/categories/3">Artigos para casa e decoração</NavLink>
          </li>
          <li>
            <NavLink to="/categories/4">Artigos esportivos</NavLink>
          </li>
          <li>
            <NavLink to="/categories/5">Livros</NavLink>
          </li>
          <li>
            <NavLink to="/categories/6">Brinquedos e jogos</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
