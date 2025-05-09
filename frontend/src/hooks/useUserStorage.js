export const useUserStorage = () => {
  const key = "user";

  const setUser = (user) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(user));
    } catch (error) {
      console.error("useUserStorage: setUser:", error);
    }
  };

  const getUser = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error("useUserStorage: getUser:", error);
    }
  };

  const removeUser = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("useUserStorage: removeUser:", error);
    }
  };

  return { setUser, getUser, removeUser };
};
