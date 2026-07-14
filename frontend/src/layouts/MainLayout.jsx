import { Outlet } from "react-router-dom";
import Navbar from '../components/common/Navbar.jsx';
import Footer from "../components/common/Footer.jsx";

function MainLayout() {

    return(
        <>

            <Navbar />
            <Outlet />
            <Footer />
           
        </>
    )
}

export default MainLayout;