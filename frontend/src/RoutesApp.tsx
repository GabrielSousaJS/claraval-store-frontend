import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Products from "pages/Products";
import ProductsFilter from "pages/ProductsFilter";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Products />} />
                <Route path='category/:categoryId' element={<ProductsFilter />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}