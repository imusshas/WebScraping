import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

import "react-loading-skeleton/dist/skeleton.css";

import Product from "./Product";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { searchKey } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const url = `http://localhost:3000/products/${searchKey}`;
      const products = await axios.get(url);
      setProductList(products.data.data);
      setLoading(false);
    };

    fetchProducts();
  }, [searchKey]);

  return (
    <main>
      <div className="container">
        <section className="product-list">
          {loading
            ? Array.from({ length: 50 }).map((_, index) => (
                <div key={index} className="loading">
                  <Skeleton className="loading-img" />
                  <div>
                    <Skeleton />
                    <Skeleton className="loading-title" />
                  </div>
                  <Skeleton className="loading-price" />
                </div>
              ))
            : productList?.map((product) => <Product key={product.productDetailsLink} {...product} />)}
        </section>
      </div>
    </main>
  );
};

export default ProductList;
