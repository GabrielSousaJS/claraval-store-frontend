import "./styles.css";

import ProductPrice from "components/ProductPrice";
import { useEffect, useState } from "react";
import { ReactComponent as AddButton } from "../../../assets/icons/addIcon.svg";
import { ReactComponent as SubButton } from "../../../assets/icons/subIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/deleteIcon.svg";
import { OrderItem } from "types/order-items";
import * as orderService from "../../../services/order-service";

type Props = {
  orderId?: number;
  item: OrderItem;
  onChange: Function;
};

export default function CartItem({ orderId, item, onChange }: Props) {
  let quantityProduct: number = item.product.quantity;

  const [itemQuantity, setItemQuantity] = useState<number>(item.quantity);

  useEffect(() => {
    updateItemQuantity();
  }, [itemQuantity]);

  async function updateItemQuantity() {
    if (orderId) {
      await orderService.updateItem(orderId, item.product.id, itemQuantity);
      onChange();
    }
  }

  function handleAddItem() {
    if (itemQuantity < quantityProduct) {
      setItemQuantity(itemQuantity + 1);
      onChange();
    }
  }

  function handleSubtractItem() {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  }

  function getSubTotal(): number {
    return item.product.price * itemQuantity;
  }

  function handleDelete() {
    if (orderId) {
      orderService.deleteItem(orderId, item.product.id).then(() => {
        onChange();
      });
    }
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
          <ProductPrice price={getSubTotal()} />
        </div>
        <div className="cart-item-delete" onClick={() => handleDelete()}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
}
