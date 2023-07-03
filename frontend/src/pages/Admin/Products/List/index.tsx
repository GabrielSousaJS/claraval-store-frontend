import { Link } from "react-router-dom";
import "./styles.css";
import ButtonPrimary from "components/ButtonPrimary";
import { Product } from "types/product";
import { useEffect, useState } from "react";
import * as productService from "../../../../services/product-service";
import ProductCrudCard from "../ProductCrudCard";

export default function List() {
  const [products, setProducts] = useState<Array<Product>>();

  useEffect(() => getProducts(), []);

  const getProducts = () => {
    productService.findAll("").then((response) => {
      setProducts(response.data);
    });
  };

  return (
    <div className="product-card-container">
      <div className="product-crud-bar-container">
        <div>
          <h4>Listagem de produtos</h4>
        </div>
        <Link to={"/admin/products/create"}>
          <ButtonPrimary text={"Adicionar"} />
        </Link>
      </div>
      <div className="row">
        {products?.map((product) => (
          <div className="col-sm-6 col-md-12" key={product.id}>
            <ProductCrudCard product={product} onDelete={() => getProducts()} />
          </div>
        ))}
      </div>
    </div>
  );
}
