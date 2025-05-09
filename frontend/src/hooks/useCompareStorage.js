export const useCompareStorage = () => {
  const key = "compare";

  const addProduct = (product, uniqueKey) => {
    try {
      const existing = JSON.parse(window.localStorage.getItem(key)) || [];

      const alreadyExists = existing.some(item => item.key === uniqueKey);
      if (alreadyExists) return;

      const updated = [...existing, { key: uniqueKey, ...product }];
      window.localStorage.setItem(key, JSON.stringify(updated));
    } catch (error) {
      console.error("useCompareStorage: addProduct:", error);
    }
  };

  const getProducts = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("useCompareStorage: getProducts:", error);
      return [];
    }
  };

  const removeProduct = (uniqueKey) => {
    try {
      const existing = JSON.parse(window.localStorage.getItem(key)) || [];
      const filtered = existing.filter(item => item.key !== uniqueKey);
      window.localStorage.setItem(key, JSON.stringify(filtered));
    } catch (error) {
      console.error("useCompareStorage: removeProduct:", error);
    }
  };

  const clearAll = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("useCompareStorage: clearAll:", error);
    }
  };

  return { addProduct, getProducts, removeProduct, clearAll };
};
