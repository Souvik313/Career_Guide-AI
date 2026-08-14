import { Outlet } from "react-router-dom";
import Navbar from '../components/common/Navbar.jsx';
import Footer from "../components/common/Footer.jsx";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default MainLayout;