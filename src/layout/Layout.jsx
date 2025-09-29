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
      <div className="flex flex-col min-h-[calc(100vh-88px)]">
        <main className="py-14">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
