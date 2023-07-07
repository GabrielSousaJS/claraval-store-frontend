import "./styles.css";

import { Order } from "types/order";
import * as formatters from "../../../utils/formatters";
import { ReactComponent as ItemMaker } from "../../../assets/icons/itemMarker.svg";

type Props = {
  order: Order;
};

export default function OrderItem({ order }: Props) {
  const items = order.items;

  return (
    <div className="base-card order-item-container mt-4">
      <div className="row order-products-info">
        <div className="col-md-3 m-0 order-products-name">
          {items.map((item) => (
            <div className="d-flex">
              <ItemMaker /> <p className="m-0">{item.product.name}</p>
              </div>
          ))}
        </div>
        <p className="col-md-3 m-0 order-info">{formatters.formatDate(order.moment)}</p>
        <p className="col-md-3 m-0 order-info">
          R$ {formatters.formatPrice(Number(order.getTotal))}
        </p>
        <p className="col-md-3 m-0 order-info">{order.orderStatus}</p>
      </div>
    </div>
  );
}
