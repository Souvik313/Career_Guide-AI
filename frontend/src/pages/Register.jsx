import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";

const Register = () => {

    const navigate = useNavigate();

    const {
        register,
        loading,
    } = useAuth();

    const [error, setError] = useState("");

    const handleRegister = async (formData) => {

        try {

            setError("");

            if (formData.password !== formData.confirmPassword) {

                setError("Passwords do not match.");

                return;

            }

            await register({

                full_name: formData.username,
                email: formData.email,
                password: formData.password,

            });

            navigate("/login");

        }

        catch (err) {

            const detail = err?.response?.data?.detail;

            if (Array.isArray(detail)) {

                setError(detail[0].msg);

            } else {

                setError(detail || "Registration failed. Please try again.");

            }

        }

    };

    return (

        <AuthLayout>

            <AuthForm

                mode="register"
                onSubmit={handleRegister}
                loading={loading}
                error={error}

            />

        </AuthLayout>

    );

};

export default Register;