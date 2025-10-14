import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../redux/slices/CartSlice";
import { selectIsAuthenticated } from "../redux/slices/authSlice";
import { Badge } from "@heroui/react";
import UserProfile from "../components/profile/UserProfile";
import Auth from "../components/auth/Auth";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";

const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartTotalCount = useSelector(selectCartItemCount);
  return (
    <header className="bg-primary px-6 flex items-center justify-between h-[88px]">
      <Link
        to="/"
        className="flex items-center gap-3 cursor-pointer"
        aria-label="Main logo in header, Go to home"
      >
        <div className="bg-white w-14 h-14 grid place-content-center ">
          <span className="inline-block text-3xl" aria-hidden="true">
            🌱
          </span>
        </div>
        <h1 className="text-white font-bold text-2xl" aria-hidden="true">
          Botanica Plus
          <span className="block font-normal text-base">
            Nature's Finest Selection
          </span>
        </h1>
      </Link>
      <div className="flex items-center gap-10">
        {isAuthenticated ? (
          <>
            <Badge
              content={cartTotalCount}
              color="primary"
              className="text-black bg-white border-primary"
            >
              <Link
                to="/cart"
                className="inline-block"
                aria-label={`Open cart. ${cartTotalCount} item${
                  cartTotalCount === 1 ? "" : "s"
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
