import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Login } from "../Login";
import Footer from "./Footer";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const AppLayout = () => {
  const { getItem, removeItem } = useLocalStorage("user");
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(getItem());
  }, []);

  return (
    <main>
      <Header setShowLogin={setShowLogin} currentUser={currentUser} setCurrentUser={setCurrentUser} getItem={getItem} removeItem={removeItem} />
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} setCurrentUser={setCurrentUser} />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default AppLayout;
