import {
    useState,
    useCallback,
} from "react";

import {
    getUserProfile,
    updateUserProfile,
    changePassword,
} from "../services/userService.js";


const useProfile = () => {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);


    /* =====================================================
       Get User Profile
    ===================================================== */

    const fetchUserProfile = useCallback(
        async () => {

            try {

                setLoading(true);
                setError(null);

                const data = await getUserProfile();

                setProfile(data);

                return data;

            } catch (err) {

                const message =
                    err?.response?.data?.detail ||
                    "Failed to fetch profile.";

                setError(message);

                throw err;

            } finally {

                setLoading(false);

            }

        },
        []
    );


    /* =====================================================
       Update User Profile
    ===================================================== */

    const updateProfile = useCallback(
        async (userData) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await updateUserProfile(userData);

                setProfile(data);

                return data;

            } catch (err) {

                const message =
                    err?.response?.data?.detail ||
                    "Failed to update profile.";

                setError(message);

                throw err;

            } finally {

                setLoading(false);

            }

        },
        []
    );


    /* =====================================================
       Change Password
    ===================================================== */

    const handleChangePassword = useCallback(
        async (passwordData) => {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await changePassword(passwordData);

                return data;

            } catch (err) {

                const message =
                    err?.response?.data?.detail ||
                    "Failed to change password.";

                setError(message);

                throw err;

            } finally {

                setLoading(false);

            }

        },
        []
    );


    /* =====================================================
       Clear Error
    ===================================================== */

    const clearError = useCallback(() => {

        setError(null);

    }, []);


    return {

        profile,

        loading,

        error,

        fetchUserProfile,

        updateProfile,

        changePassword:
            handleChangePassword,

        clearError,

    };

};


export default useProfile;