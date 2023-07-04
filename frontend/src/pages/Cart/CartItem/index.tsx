import "./styles.css";

import ProductPrice from "components/ProductPrice";
import { useState } from "react";
import { ReactComponent as AddButton } from "../../../assets/icons/addIcon.svg";
import { ReactComponent as SubButton } from "../../../assets/icons/subIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/deleteIcon.svg";

type Props = {
  item: any;
};

export default function CartItem({ item }: Props) {
  let quantityProduct: number = item.product.quantity;

  const [itemQuantity, setItemQuantity] = useState<number>(item.quantity);

  function handleAddItem() {
    if (itemQuantity < quantityProduct) {
      setItemQuantity(itemQuantity + 1);
    }
  }

  function handleSubtractItem() {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  }

  function handleDelete() {
    console.log(item);
    item = null;
    console.log(item);
  }

  return (
    <div className="base-card cart-item-container">
      <div className="cart-item-img">
        <img src={item.product.imgUrl} alt={item.product.name} />
      </div>

      <div className="cart-item-info">
        <div className="cart-item-name">
          <h3>{item.product.name}</h3>
        </div>
        <div className="cart-item-quantity">
          <button onClick={handleSubtractItem}>
            <SubButton />
          </button>
          <h3>{itemQuantity}</h3>
          <button onClick={handleAddItem}>
            <AddButton />
          </button>
        </div>
        <div className="cart-item-price">
          <ProductPrice price={item.product.price * itemQuantity} />
        </div>
        <div className="cart-item-delete" onClick={handleDelete}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
}
