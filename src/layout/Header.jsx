import { Link } from "react-router";
import UserProfile from "../components/UserProfile";
import { Badge } from "@heroui/react";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { useSelector } from "react-redux";
import Auth from "../components/Auth";

const Header = () => {
  const authState = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state.cart);

  const totalCartQuantity = cartState
    ? cartState.items.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <header className="bg-primary px-6 flex items-center justify-between h-[88px]">
      <Link
        to="/"
        className="flex items-center gap-3 cursor-pointer"
        aria-label="Main logo in header, Go to home"
      >
        <div className="bg-white w-16 h-16 rounded-full grid place-content-center ">
          <span className="inline-block text-3xl" aria-hidden="true">
            🌱
          </span>
        </div>
        <h1 className="text-white font-bold text-2xl" aria-hidden="true">
          Paradise Nursery{" "}
          <span className="block font-normal text-base">
            Where Green Meets Serenity
          </span>
        </h1>
      </Link>
      <div className="flex items-center gap-10">
        {authState.isAuthenticated ? (
          <>
            <Badge
              content={totalCartQuantity}
              color="primary"
              className="text-black bg-white border-primary"
            >
              <Link
                to="/cart"
                className="inline-block"
                aria-label={`Open cart. ${totalCartQuantity} item${
                  totalCartQuantity === 1 ? "" : "s"
                }`}
              >
                <ShoppingCartIcon className="w-7 h-7 text-white" />
              </Link>
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
