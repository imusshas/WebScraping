import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";

const ProductList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      const products = await axios.get("http://localhost:3000/");
      console.log(products);
      setProductList(products.data.data);
    };
    fetchHomeProducts();
  }, []);

  return (
    <section className="product-list">
      {productList.map((product) => (
        <Product key={product.productDetailsLink} {...product} />
      ))}
    </section>
  );
};

export default ProductList;
