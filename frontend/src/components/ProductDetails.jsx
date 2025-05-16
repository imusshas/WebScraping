import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router";
import { useCompareStorage } from "../hooks/useCompareStorage";
import { fetchProductDetails, addToWishlist } from "../utils/actions";
import { Button } from "../components/ui/Button";
import { Ratings } from "./Ratings";
import { useUserStorage } from "../hooks/useLocalStorage";
import { useWishlist } from "../context/WishlistContext";
import { useCompare } from "../context/CompareContext";

const ProductDetails = () => {
  const { setShowLogin } = useOutletContext();
  const { getUser } = useUserStorage();
  const { addProduct } = useCompareStorage();
  const { updateWishlistCount } = useWishlist();
  const { updateCompareCount } = useCompare();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  useEffect(() => {
    fetchProductDetails(productId).then(setProduct);
  }, [productId]);

  if (!product) return null;

  return (
    <div className="product-details-container">
      <div className="product-info">
        <div className="product-info-img-container">
          <img src={product.imageUrls[0]} alt={product.title} className="product-info-img" />
        </div>
        <div className="product-info-content">
          <h2>{product.title}</h2>
          <div className="product-info-sort-desc">
            <p className="ratings-reviews">
              <Ratings />
              <Ratings />
              <Ratings />
              <Ratings />
              <Ratings />
              <>{product.reviews}</>
            </p>
            <p className="product-id">Product Id: {product.productId}</p>
            <p>
              <span>Company: </span>
              {product.company}
            </p>
            <div className="special-price">
              <p>Special Price </p>
              <p className="price">{product.specialPrice}৳</p>
            </div>
            <p>
              <span>Regular Price: </span>
              {product.regularPrice}৳
            </p>
          </div>
          <div className="product-info-buttons">
            <Button
              onClick={async () => {
                const user = getUser();
                if (!user) {
                  setShowLogin(true);
                  return;
                }
                setIsAddingToWishlist(true);
                try {
                  await addToWishlist(productId, product.specialPrice || product.regularPrice, user.email);
                  updateWishlistCount();
                } catch (error) {
                  alert(error.response?.data?.message || "Failed to add to wishlist");
                }
                setIsAddingToWishlist(false);
              }}
              disabled={isAddingToWishlist}
            >
              {isAddingToWishlist ? "Adding..." : "Add To Wishlist"}
            </Button>
            <Button
              onClick={() => {
                addProduct(product, `${product.company}${product.productId}`);
                updateCompareCount();
              }}
            >
              Add To Compare
            </Button>
          </div>
        </div>
      </div>
      <div>
        <table className="attribute-table">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(product.attributes).map(([key, value]) => (
              <tr key={key}>
                <td className="key">{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetails;
