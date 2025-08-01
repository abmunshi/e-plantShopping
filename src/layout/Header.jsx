import React from "react";
import UserProfile from "../components/UserProfile";
import { Badge } from "@heroui/react";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Auth from "../components/Auth";

const Header = () => {
  const authState = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const totalCartQuantity = cartState
    ? cartState.items.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <header className="bg-primary px-6 flex items-center justify-between h-[88px]">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="bg-white w-16 h-16 rounded-full grid place-content-center ">
          <span className="inline-block text-3xl">🌱</span>
        </div>
        <h1 className="text-white font-bold text-2xl">
          Paradise Nursery{" "}
          <span className="block font-normal text-base">
            Where Green Meets Serenity
          </span>
        </h1>
      </div>
      <div className="flex items-center gap-10">
        {authState.isAuthenticated ? (
          <>
            <Badge content={totalCartQuantity} color="secondary">
              <button
                className="inline-block"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCartIcon className="w-7 h-7 text-white" />
              </button>
            </Badge>
            <UserProfile />
          </>
        ) : (
          <div className="flex items-center gap-6">
            <Auth />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
