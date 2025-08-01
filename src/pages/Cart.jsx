import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import CartItem from "../components/CartItem";
import { Container } from "../components/Utls";
const Cart = () => {
  const cartState = useSelector((state) => state.cart);

  return (
    <Container>
      <Typography type="h4" className="mb-6">
        Your Cart
      </Typography>
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
          <Typography type="h6">Order summary</Typography>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
