import { Routes, Route } from "react-router";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthStatus } from "./redux/slices/authSlice.js";
import { getCurrentCart } from "./redux/slices/CartSlice.js";
import { getJWT } from "./helpers/jwt.js";
import GoogleRedirect from "./components/auth/GoogleRedirect.jsx";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (getJWT()) {
      dispatch(checkAuthStatus());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentCart());
    }
  }, [isAuthenticated, dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route
        path="/api/connect/:providerName/callback"
        element={<GoogleRedirect />}
      />
    </Routes>
  );
};

export default App;
