import { BrowserRouter, Route, Routes } from "react-router";
import ProductList from "./components/ProductList";
import PageLayout from "./layout/PageLayout";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/:searchKey" element={<ProductList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
