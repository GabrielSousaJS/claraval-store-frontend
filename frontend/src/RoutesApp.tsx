import Login from "pages/Login";
import Products from "pages/Products";
import ProductsFilter from "pages/ProductsFilter";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Products />} />
                <Route path='category/:categoryId' element={<ProductsFilter />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}