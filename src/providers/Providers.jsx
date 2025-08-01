import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <HeroUIProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </HeroUIProvider>
    </Provider>
  );
};

export default Providers;
