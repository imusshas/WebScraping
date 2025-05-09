import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Wishlist from "./components/Wishlist";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:searchKey/:currentPage" element={<ProductList />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/:productId" element={<ProductDetails />} />
        </Route>
        <Route path="*" replace="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
