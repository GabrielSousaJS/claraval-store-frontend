import "./styles.css";

import { Product } from "types/product";
import { useEffect, useState } from "react";
import * as productService from "../../services/product-service";
import ProductCard from "components/ProductCard";
import { Link } from "react-router-dom";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

export default function Products() {
  const [products, setProducts] = useState<Array<Product>>();

  const [productName, setProductName] = useState("");

  useEffect(() => {
    productService.findAll(productName).then((response) => {
      setProducts(response.data);
    });
  }, [productName]);

  function handleSearch(searchText: string) {
    setProductName(searchText);
  }

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="container my-4 products-container">
        <div className="row product-title">
          <h1>Catálogo de produtos</h1>
        </div>

        <div className="row">
          {products?.map((product) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
