import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar.jsx";
import ProfileSidebar from "../components/profile/ProfileSidebar.jsx";

function ProfileLayout() {
    
return (

    <div
        className="
            min-h-screen
            bg-[#faf9ff]
        "
    >

        {/* =================================================
            Global Navbar
        ================================================= */}

        <Navbar />


        {/* =================================================
            Profile Workspace
        ================================================= */}

        <div
            className="
                flex
                min-h-[calc(100vh-5rem)]
                w-full
            "
        >

            {/* =================================================
                Profile Sidebar
            ================================================= */}

            <ProfileSidebar />


            {/* =================================================
                Profile Content
            ================================================= */}

            <main
                className="
                    min-w-0
                    flex-1
                    overflow-x-hidden
                    px-4
                    py-6
                    sm:px-6
                    sm:py-8
                    lg:px-10
                    lg:py-10
                "
            >

                <div
                    className="
                        mx-auto
                        w-full
                        max-w-6xl
                    "
                >

                    <Outlet />

                </div>

            </main>

        </div>

    </div>

);

}

export default ProfileLayout;
