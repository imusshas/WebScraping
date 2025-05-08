import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import ProductList from "./components/ProductList";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:searchKey" element={<ProductList />} />
        </Route>
        <Route path="*" replace="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
