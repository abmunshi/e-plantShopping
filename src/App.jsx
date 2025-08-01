import { Routes, Route } from "react-router";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Providers from "./providers/providers.jsx";

const App = () => {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </Providers>
  );
};

export default App;
