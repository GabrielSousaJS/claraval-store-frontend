import "./styles.css";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import CartItem from "./CartItem";
import * as formatters from "../../utils/formatters";
import { Order } from "types/order";
import { useEffect, useState } from "react";
import * as orderService from "../../services/order-service";
import { hasOpenOrder } from "utils/orders";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    getOrder();
  }, []);

  async function getOrder() {
    const response = await orderService.getOrdersFromClient();
    let orders: Array<Order> = response.data;
    const sortedOrder = hasOpenOrder(orders);
    if (sortedOrder) {
      sortedOrder.items.sort(
        (itemA, itemB) => itemA.product.id - itemB.product.id
      );
    }

    setOrder(sortedOrder);
  }

  async function handleFinalizeOrder() {
    if (order?.id) {
      let data = {
        moment: String(new Date().toISOString()),
      };
      await orderService.finalizeOrder(order?.id ?? 0, data);
    }
    navigate("/orders/history");
    getOrder();
  }

  function handleGoToHistory() {
    navigate("/orders/history");
  }

  function ignore() {}

  return (
    <>
      <Navbar onSearch={ignore} />
      {order?.items.length ? (
        <div className="cart-card-container">
          <div className="cart-top-container d-flex justify-content-between">
            <h1>Meu carrinho</h1>
            <button className="btn btn-secondary" onClick={handleGoToHistory}>
              Histórico de pedidos
            </button>
          </div>

          <div className="row mt-3">
            <div className="col-lg-8 mb-5 cart-item">
              {order?.items.map((item) => (
                <CartItem
                  orderId={order.id}
                  item={item}
                  onChange={() => {
                    getOrder();
                  }}
                  key={item.product.id}
                />
              ))}
            </div>

            <div className="col-lg-4">
              <h1 className="ps-3">Resumo do pedido</h1>

              <div className="cart-total-price">
                <div className="cart-total-info">
                  <h3>Total</h3>
                  <p>
                    R$ {order ? formatters.formatPrice(order.getTotal ?? 0) : 0}
                  </p>
                </div>
              </div>

              <button
                className="btn btn-secondary cart-button"
                onClick={handleFinalizeOrder}
              >
                Fechar pedido
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-card-container">
          <div className="cart-top-container d-flex justify-content-between">
            <h1>O seu carrinho está vazio</h1>
            <button className="btn btn-secondary" onClick={handleGoToHistory}>
              Histórico de pedidos
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
