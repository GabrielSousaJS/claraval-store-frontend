import "../Products/styles.css";


import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "types/product";
import * as productService from "../../services/product-service";
import ProductCard from "components/ProductCard";

type UrlParams = {
  categoryId: string;
};

export default function ProductsFilter() {
  const [products, setProducts] = useState<Array<Product>>();

  const { categoryId } = useParams<UrlParams>();

  useEffect(() => {
    productService
      .findProdutsByCategory(Number(categoryId))
      .then((response) => setProducts(response.data));
  }, [categoryId]);

  return (
    <div className="container my-4 products-container">
      <div className="row product-title">
        <h1>Filtro por categoria</h1>
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
  );
}
