import { Outlet } from "react-router";
import { useState } from "react";
import Header from "./Header";
import { Login } from "../Login";
import Footer from "./Footer";

const AppLayout = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <main>
      <Header setShowLogin={setShowLogin} />
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <div className="container">
        <Outlet context={{ setShowLogin }} />
      </div>
      <Footer />
    </main>
  );
};

export default AppLayout;
