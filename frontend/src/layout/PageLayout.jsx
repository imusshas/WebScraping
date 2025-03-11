import { Outlet } from "react-router";
import Header from "./Header";

const PageLayout = () => {
  return (
    <main>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
};

export default PageLayout;
