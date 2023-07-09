import "./styles.css";

import { Product } from "types/product";
import * as productService from "../../../../services/product-service";
import ProductPrice from "components/ProductPrice";
import CategoryBadge from "../CategoryBadge";
import { Link } from "react-router-dom";
import { useState } from "react";
import DialogInfo from "components/DialogInfo";

type Props = {
  product: Product;
  onDelete: Function;
};

export default function ProductCrudCard({ product, onDelete }: Props) {
  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    message: "",
  });

  const handleDelete = (productId: number) => {
    if (!window.confirm("Tem certeza que deseja deletar?")) {
      return;
    }

    productService
      .deleteProductById(productId)
      .then(() => {
        onDelete();
      })
      .catch((error) => {
        setDialogInfoData({
          visible: true,
          message: error.response.data.error,
        });
      });
  };

  function handleDialogInfoClose() {
    setDialogInfoData({ ...dialogInfoData, visible: false });
  }

  return (
    <div className="base-card product-crud-card">
      <div className="product-crud-card-top-container">
        <img src={product.imgUrl} alt={product.name} />
      </div>

      <div className="product-crud-card-description">
        <div className="product-crud-card-bottom-container">
          <h6>{product.name}</h6>
          <ProductPrice price={product.price} />
        </div>
        <div className="product-crud-categories-container">
          {product.categories.map((category) => (
            <CategoryBadge name={category.name} key={category.id} />
          ))}
        </div>
      </div>

      <div className="product-crud-card-buttons-container">
        <button
          onClick={() => handleDelete(product.id)}
          className="btn btn-outline-danger product-crud-card-button product-crud-card-botton-remove"
        >
          EXCLUIR
        </button>

        <Link to={`/admin/products/${product.id}`}>
          <button className="btn btn-outline-secondary product-crud-card-button">
            EDITAR
          </button>
        </Link>
      </div>
      {dialogInfoData.visible && (
        <DialogInfo
          message={dialogInfoData.message}
          onDialogClose={handleDialogInfoClose}
        />
      )}
    </div>
  );
}
