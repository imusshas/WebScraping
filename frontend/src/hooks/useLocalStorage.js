export const useLocalStorage = (key) => {
  const setItem = (value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("useLocalStorage: setItem: ", error)
    }
  }

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.log("useLocalStorage: getItem: ", error)
    }
  }

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log("useLocalStorage: removeItem: ", error)
    }
  }

  return { setItem, getItem, removeItem }
}