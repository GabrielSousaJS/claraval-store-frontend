import "./styles.css";

import { NavLink } from "react-router-dom";

export default function NavbarAdmin() {
  return (
    <div className="admin-nav-container">
      <ul className="admin-nav-ul">
        <li>
          <NavLink to="/admin/products" className="admin-nav-item">
            <p>Produtos</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories" className="admin-nav-item">
            <p>Categorias</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" className="admin-nav-item">
            <p>Pedidos</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className="admin-nav-item">
            <p>Usuários</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
