import "./styles.css";

import { Product } from "types/product";
import ProductPrice from "components/ProductPrice";
import ButtonInverse from "components/ButtonInverse";
import ButtonPrimary from "components/ButtonPrimary";
import { ReactComponent as AddButton } from "../../assets/icons/addIcon.svg";
import { ReactComponent as SubButton } from "../../assets/icons/subIcon.svg";
import { useEffect, useState } from "react";

type Props = {
  product: Product;
};

export default function ProductModal({ product }: Props) {
  const [quantityProduct, setQuantityProduct] = useState<number>(1);

  useEffect(() => {
    setQuantityProduct(quantityProduct);
  }, [quantityProduct]);

  function handleAdd() {
    if (quantityProduct < product.quantity) {
      setQuantityProduct(quantityProduct + 1);
    }
  }

  function handleSubtract() {
    if (quantityProduct > 1) {
      setQuantityProduct(quantityProduct - 1);
    }
  }

  return (
    <div className="modal-background">
      <div className="row modal-box">
        <div className="col-xl-6">
          <div className="img-container">
            <img src={product.imgUrl} alt={product.name} />
          </div>
          <div className="product-info">
            <h3>{product.name}</h3>
            <ProductPrice price={product.price} />
            <span>Estoque: {product.quantity}</span>
          </div>
        </div>
        <div className="col-xl-6 description-container">
          <div>
            <h4>Descrição do produto</h4>
            <p>{product.description}</p>
          </div>
          <div className="quantity-container">
            <h6>Quatidade</h6>
            <button onClick={handleSubtract}>
              <SubButton />
            </button>
            <span>{quantityProduct}</span>
            <button onClick={handleAdd}>
              <AddButton />
            </button>
          </div>
        </div>

        <div className="buttons-modal">
          <div className="button-cancel">
            <ButtonInverse text={"cancelar"} />
          </div>
          <ButtonPrimary text={"adicionar ao carrinho"} />
        </div>
      </div>
    </div>
  );
}
