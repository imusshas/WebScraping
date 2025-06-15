// WishlistContext.jsx

import { createContext, useContext, useState } from "react";
import { getWishlist } from "../utils/actions";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateWishlistCount = async (email) => {
    try {
      const items = await getWishlist(email);
      console.log(items);
      setWishlistCount(items.length);
    } catch (error) {
      console.error("Error fetching wishlist count:", error);
    }
  };

  const clearWishlistCount = () => {
    setWishlistCount(0);
  };
  return (
    <WishlistContext.Provider value={{ wishlistCount, updateWishlistCount, clearWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};
