import "./styles.css";

import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

export default function Admin() {
  function ignore() {}

  return (
    <>
      <Navbar onSearch={ignore} />
      <div className="admin-container">
        <NavbarAdmin />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
