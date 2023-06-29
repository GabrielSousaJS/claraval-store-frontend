import "../Products/styles.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "types/product";
import * as productService from "../../services/product-service";
import ProductCard from "components/ProductCard";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import ProductModal from "components/ProductModel";

type UrlParams = {
  categoryId: string;
};

export default function ProductsFilter() {
  const [products, setProducts] = useState<Array<Product>>();

  const [modalProduct, setModalProdut] = useState<any>();

  const [productName, setProductName] = useState("");

  const { categoryId } = useParams<UrlParams>();

  useEffect(() => {
    productService
      .findProdutsByCategory(Number(categoryId), productName)
      .then((response) => setProducts(response.data));
  }, [categoryId, productName]);

  function handleSearch(searchText: string) {
    setProductName(searchText);
  }

  function handleModalClose() {
    setModalProdut(null);
  }

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="container my-4 products-container">
        <div className="row product-title">
          <h1>Filtro por categoria</h1>
        </div>

        <div className="row">
          {products?.map((product) => (
            <div
              className="col-sm-6 col-lg-4 col-xl-3"
              key={product.id}
              onClick={() => setModalProdut(product)}
            >
              <div className="product-item">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalProduct && (
        <ProductModal product={modalProduct} onModalClose={handleModalClose} />
      )}
      <Footer />
    </>
  );
}
