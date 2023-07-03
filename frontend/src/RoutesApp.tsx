import Admin from "pages/Admin";
import CategoriesAdmin from "pages/Admin/Categories";
import ProductsAdmin from "pages/Admin/Products";
import FormProducts from "pages/Admin/Products/FormProducts";
import List from "pages/Admin/Products/List";
import Login from "pages/Login";
import Products from "pages/Products";
import ProductsFilter from "pages/ProductsFilter";
import SingUp from "pages/SignUp";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="category/:categoryId" element={<ProductsFilter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />

        <Route path="/admin" element={<Admin />}>
          <Route path="/admin" element={<Navigate to="products" />} />
          <Route path="/admin/products" element={<ProductsAdmin />}>
            <Route path="/admin/products" element={<List />} />
            <Route
              path="/admin/products/:productId"
              element={<FormProducts />}
            />
          </Route>
          <Route path="/admin/categories" element={<CategoriesAdmin />} />
          <Route path="/admin/categories/:categoryId" element={<h1>Página de formulário para categorias</h1>} />
          <Route path="/admin/orders" element={<h1>Página de pedidos</h1>} />
          <Route path="/admin/users" element={<h1>Página de usuários</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
