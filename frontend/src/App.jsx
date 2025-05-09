import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Wishlist from "./components/Wishlist";
import CompareProducts from "./components/CompareProducts";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/products/:searchKey/:currentPage" element={<ProductList />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product-details/:productId" element={<ProductDetails />} />
          <Route path="/compare-products" element={<CompareProducts />} />
        </Route>
        <Route path="*" replace="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
