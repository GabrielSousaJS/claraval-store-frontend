import "./styles.css";

import { Product } from "types/product";
import ProductPrice from "components/ProductPrice";
import ButtonInverse from "components/ButtonInverse";
import ButtonPrimary from "components/ButtonPrimary";
import { ReactComponent as AddButton } from "../../assets/icons/addIcon.svg";
import { ReactComponent as SubButton } from "../../assets/icons/subIcon.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "utils/auth";
import * as orderService from "../../services/order-service";
import { Order } from "types/order";
import { OrderItem } from "types/order-items";
import {
  createNewOrderItem,
  createOrder,
  createOrderItem,
  hasOpenOrder,
} from "utils/orders";

type Props = {
  product?: Product;
  onModalClose: Function;
};

export default function ProductModal({ product, onModalClose }: Props) {
  let stock = product ? product.quantity : 0;

  const [quantityProduct, setQuantityProduct] = useState<number>(1);

  const [orders, setOrders] = useState<Array<Order>>();

  const navigate = useNavigate();

  useEffect(() => {
    setQuantityProduct(quantityProduct);
  }, [quantityProduct]);

  useEffect(() => {
    if (isAuthenticated()) {
      orderService.getOrdersFromClient().then((response) => {
        setOrders(response.data);
      });
    }
  });

  function handleAdd() {
    if (quantityProduct < stock) {
      setQuantityProduct(quantityProduct + 1);
    }
  }

  function handleSubtract() {
    if (quantityProduct > 1) {
      setQuantityProduct(quantityProduct - 1);
    }
  }

  async function handleAddItem() {
    if (isAuthenticated()) {
      if (orders) {
        let openOrder = hasOpenOrder(orders);

        if (openOrder) {
          if (product) {
            await addOrderItem(openOrder, product);
          }
        } else if (product) {
          await addOrderItemNewOrder(product);
        }
        navigate("/orders");
      }
    } else navigate("/login");
  }

  async function addOrderItem(openOrder: Order, product: Product) {
    let item = createOrderItem(openOrder, product, quantityProduct);

    if (openOrder?.id) {
      await orderService.addItemToOrder(openOrder?.id, item);
    }
  }

  async function addOrderItemNewOrder(product: Product) {
    let item = createNewOrderItem(product, quantityProduct);

    let items: Array<OrderItem> = [];
    items.push(item);

    let order = createOrder(items);

    await orderService.saveOrder(order);
  }

  return (
    <div className="modal-background" onClick={() => onModalClose()}>
      <div className="row modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="col-xl-6">
          <div className="img-container">
            <img src={product?.imgUrl} alt={product?.name} />
          </div>
          <div className="product-info">
            <h3>{product?.name}</h3>
            <ProductPrice price={product ? product?.price : 0} />
          </div>
        </div>
        <div className="col-xl-6 description-container">
          <div>
            <h4>Descrição do produto</h4>
            <p>{product?.description}</p>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-sm-6 align-self-center">
            <span>Estoque: {product?.quantity}</span>
          </div>

          {stock > 0 ? (
            <div className="col-sm-6 quantity-container">
              <h6>Quatidade</h6>
              <button onClick={handleSubtract}>
                <SubButton />
              </button>
              <span>{quantityProduct}</span>
              <button onClick={handleAdd}>
                <AddButton />
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="buttons-modal">
          <div className="button-cancel" onClick={() => onModalClose()}>
            <ButtonInverse text={"cancelar"} />
          </div>

          {stock > 0 ? (
            <div onClick={handleAddItem}>
              <ButtonPrimary text={"adicionar ao carrinho"} />
            </div>
          ) : (
            <div className="quantity-warning">Produto não disponível</div>
          )}
        </div>
      </div>
    </div>
  );
}
