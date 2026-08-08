import {useState} from 'react';
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import AuthLayout from "../components/auth/AuthLayout";
import AuthForm from "../components/auth/AuthForm";

const Login = () => {

    const navigate = useNavigate();

    const {
        login,
        loading,
    } = useAuth();

    const [error, setError] = useState("");

    const handleLogin = async (formData) => {

        try {

            setError("");

            await login({

                email: formData.email,

                password: formData.password,

            });

            navigate("/");

        }

        catch (err) {

            setError(

                err?.response?.data?.detail ||

                "Login failed. Please try again."

            );

        }

    };

    return (

        <AuthLayout>

            <AuthForm

                mode="login"

                onSubmit={handleLogin}

                loading={loading}

                error={error}

            />

        </AuthLayout>

    );

};

export default Login;