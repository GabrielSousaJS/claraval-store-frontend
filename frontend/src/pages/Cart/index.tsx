import "./styles.css";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import CartItem from "./CartItem";
import * as formatters from "../../utils/formatters";

export default function Cart() {
  const items = {
    orderId: 1,
    product: {
      id: 2,
      name: "iPad Pro (2021)",
      description:
        "O melhor tablet para usuários avançados com chip M1, tela Liquid Retina XDR de 12,9 polegadas, conectividade 5G e suporte para Apple Pencil e Magic Keyboard.",
      price: 8194.7,
      quantity: 10,
      imgUrl:
        "https://images-americanas.b2w.io/produtos/01/00/img/321640891/0/3216408988_1GG.jpg",
      categories: [],
    },
    quantity: 2,
    subTotal: 16389.4,
  };

  function ignore() {}

  return (
    <>
      <Navbar onSearch={ignore} />
      <div className="cart-card-container">
        <h1>Meu carrinho</h1>

        <div className="row mt-3">
          <div className="col-lg-8 mb-5 cart-item">
            <CartItem item={items} />
          </div>

          <div className="col-lg-4">
            <h1 className="ps-3">Sub-total</h1>

            <div className="cart-total-price">
              <div className="cart-total-info">
                <h3>Total</h3>
                <p>
                  R${" "}
                  {formatters.formatPrice(items.product.price * items.quantity)}
                </p>
              </div>
            </div>

            <button className="btn btn-secondary cart-button">
              Fechar pedido
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
