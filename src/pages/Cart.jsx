import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Container } from "../components/Utls";
import { Link } from "react-router";
import { Button, Divider } from "@heroui/react";
const Cart = () => {
  const cartState = useSelector((state) => state.cart);
  console.log("Cart state:", cartState);
  return (
    <Container>
      <div className="grid grid-cols-[auto_410px] gap-6 items-start">
        <div>
          {cartState.items.length > 0 ? (
            cartState.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))
          ) : (
            <div>
              <p>Your cart is empty</p>
              <Link to="/">Continue Shopping</Link>
            </div>
          )}
        </div>

        <div className="bg-secondary border-t border-gray-200 p-6 ">
          <h6 className="text-xl font-bold mb-4">Order summary</h6>
          <div className="flex items-center justify-between mb-2">
            <span>Subtotal</span>
            <span>$10</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span>Tax(3%)</span>
            <span>$1.25</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>$1.50</span>
          </div>

          <Divider className="my-3" />

          <div className="flex items-center justify-between ">
            <span className="font-bold">Total</span>
            <span className="font-bold">$1645</span>
          </div>

          <div className="space-y-3 mt-6">
            <Button fullWidth color="primary" radius="none" size="md">
              Proceed to checkout
            </Button>
            <Button as="a" fullWidth radius="none" href="/" size="md">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
