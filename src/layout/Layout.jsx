import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "../redux/slices/authSlice";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);
  return (
    <>
      <Header />
      <main className="py-10">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
