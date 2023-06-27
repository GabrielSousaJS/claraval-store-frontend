import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Products from "pages/Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Products />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}