import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../utils/actions";
import Header from "./Header";
import { Login } from "../Login";

const AppLayout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const user = await getCurrentUser();
      console.log("AppLayout:", user);
      setCurrentUser(user);
    }

    getUser();
  }, []);

  return (
    <main>
      <Header setShowLogin={setShowLogin} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} setCurrentUser={setCurrentUser} />
      <Outlet />
    </main>
  );
};

export default AppLayout;
