import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Container } from "../components/Utls";
const Cart = () => {
  const cartState = useSelector((state) => state.cart);

  return (
    <Container>
      <h3> Your Cart</h3>
      <div className="grid grid-cols-[auto_410px] gap-6 items-start">
        <div>
          {cartState.items.length > 0 ? (
            cartState.items.map((item) => (
              <CartItem key={item.name} item={item} />
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>

        <div className="bg-gray-200 border-t border-gray-200 p-6 ">
          <h6>Order summary</h6>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
