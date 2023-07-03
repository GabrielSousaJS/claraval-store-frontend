import { Outlet } from "react-router-dom";
import "./styles.css";
import NavbarAdmin from "./NavbarAdmin";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

export default function Admin() {
  function handleSearch() {}

  return (
    <>
      <Navbar onSearch={handleSearch} />
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
