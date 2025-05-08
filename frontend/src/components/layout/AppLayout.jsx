import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../utils/actions";
import Header from "./Header";
import { Login } from "../Login";
import Footer from "./Footer";

const AppLayout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const user = await getCurrentUser();
      setCurrentUser(user);
    }

    getUser();
  }, []);

  return (
    <main>
      <Header setShowLogin={setShowLogin} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} setCurrentUser={setCurrentUser} />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default AppLayout;
