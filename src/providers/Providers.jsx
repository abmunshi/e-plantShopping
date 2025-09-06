import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <HeroUIProvider>
        <BrowserRouter>
          {children}
          <Toaster />
        </BrowserRouter>
      </HeroUIProvider>
    </Provider>
  );
};

export default Providers;
