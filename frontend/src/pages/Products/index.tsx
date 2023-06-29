import "./styles.css";

import { Product } from "types/product";
import { useEffect, useState } from "react";
import * as productService from "../../services/product-service";
import ProductCard from "components/ProductCard";
import { Link } from "react-router-dom";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import ButtonPrimary from "components/ButtonPrimary";
import ButtonInverse from "components/ButtonInverse";
import ProductModal from "components/ProductModel";

export default function Products() {

  const productTest: Product = {
    "id": 1,
    "name": "iPhone 13 Pro",
    "description": "O mais recente smartphone topo de gama da Apple com um impressionante ecrã Super Retina XDR, chip A15 Bionic, sistema de câmara Pro, conectividade 5G e iOS 15.",
    "price": 6291.3,
    "quantity": 17,
    "imgUrl": "https://images-americanas.b2w.io/produtos/01/00/img/3919423/9/3919423949_1GG.jpg",
    "categories": [
        {
            "id": 1,
            "name": "Eletrônicos"
        }
    ]
}

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

      <ProductModal product={productTest} />
      <Footer />
    </>
  );
}
