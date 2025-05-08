import { Outlet } from "react-router";
import { useState } from "react";
import Header from "./Header";
import { Login } from "../Login";
import Footer from "./Footer";

const AppLayout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
