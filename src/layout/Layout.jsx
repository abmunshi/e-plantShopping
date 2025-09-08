import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "../redux/slices/authSlice";
import Footer from "./Footer";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);
  return (
    <>
      <Header />
      <main className="py-14">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
