import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "../redux/store";
import { HeroUIProvider, useSelect } from "@heroui/react";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import CartLoaderModal from "../components/cart/CartLoaderModal";
import { getJWT } from "../helpers/jwt";
import { checkAuthStatus } from "../redux/slices/authSlice";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <HeroUIProvider>
        <BrowserRouter>
          {children}
          <Toaster />
          <CartLoaderModal />
        </BrowserRouter>
      </HeroUIProvider>
    </Provider>
  );
};

export default Providers;
