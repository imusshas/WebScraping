// WishlistContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { getWishlist } from "../utils/actions";
import { useUserStorage } from "../hooks/useUserStorage";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const user = useUserStorage().getUser();

  const updateWishlistCount = async () => {
    try {
      const items = await getWishlist(user?.email);
      console.log(items);
      setWishlistCount(items.length);
    } catch (error) {
      console.error("Error fetching wishlist count:", error);
    }
  };

  const clearWishlistCount = () => {
    setWishlistCount(0);
  };

  useEffect(() => {
    updateWishlistCount();
  }, []);
  return (
    <WishlistContext.Provider value={{ wishlistCount, updateWishlistCount, clearWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};
