import React from "react";
import UserProfile from "../components/UserProfile";
import { Badge } from "@material-tailwind/react";
import { Cart } from "iconoir-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Header = () => {
  const authState = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const totalCartQuantity = cartState
    ? cartState.items.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <header className="bg-primary px-6 flex items-center justify-between h-20">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="bg-white w-16 h-16 rounded-full grid place-content-center ">
          <span className="inline-block text-3xl">🌱</span>
        </div>
        <h1 className="text-white font-bold">
          Paradise Nursery{" "}
          <span className="block font-normal">Where Green Meets Serenity</span>
        </h1>
      </div>
      <div className="flex items-center gap-10">
        {authState.isAuthenticated ? (
          <>
            <Badge color="secondary">
              <Badge.Content className="inline-flex items-center justify-center">
                <button
                  className="inline-block"
                  onClick={() => navigate("/cart")}
                >
                  <Cart className="w-7 h-7 text-white" />
                </button>
              </Badge.Content>
              <Badge.Indicator>{totalCartQuantity}</Badge.Indicator>
            </Badge>
            <UserProfile />
          </>
        ) : (
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                navigate("/auth/signin");
              }}
            >
              Sign In
            </button>

            <button
              onClick={() => {
                navigate("/auth/signup");
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
