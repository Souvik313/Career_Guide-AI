import { useState } from "react";
import { Link } from "react-router-dom";

import {
    User,
    Mail,
    LockKeyhole,
    ShieldCheck,
    Loader2,
} from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "../ui/card";

const AuthForm = ({
    mode,
    onSubmit,
    loading,
    error,
}) => {

    const [formData, setFormData] = useState({

        username: "",

        email: "",

        password: "",

        confirmPassword: "",

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await onSubmit(formData);

    };
    return (

        <Card className="rounded-3xl shadow-xl border-0">

            <CardHeader>

                <CardTitle className="text-3xl font-bold">

                    {mode === "login"

                        ? "Welcome back 👋"

                        : "Create your account 🚀"}

                </CardTitle>

                <CardDescription>

                    {mode === "login"

                        ? "Sign in to continue your AI-powered career journey."

                        : "Start your journey with CareerCompass AI."}

                </CardDescription>

            </CardHeader>

            <CardContent>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {
                        mode === "register" && (

                            <div className="space-y-2">

                                <Label htmlFor="username">

                                    Full Name

                                </Label>

                                <div className="relative">

                                    <User
                                        className="
                                            absolute
                                            left-3
                                            top-1/2
                                            -translate-y-1/2
                                            h-5
                                            w-5
                                            text-slate-400
                                        "
                                    />

                                    <Input

                                        id="username"

                                        name="username"

                                        type="text"

                                        placeholder="Enter your full name"

                                        value={formData.username}

                                        onChange={handleChange}

                                        className="pl-10 h-12"

                                    />

                                </div>

                            </div>

                        )
                    }

                    {/* Email */}

                    <div className="space-y-2">

                        <Label htmlFor="email">

                            Email

                        </Label>

                        <div className="relative">

                            <Mail
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    h-5
                                    w-5
                                    text-slate-400
                                "
                            />

                            <Input

                                id="email"

                                name="email"

                                type="email"

                                placeholder="Enter your email"

                                value={formData.email}

                                onChange={handleChange}

                                className="pl-10 h-12"

                            />

                        </div>

                    </div>

                    {/* Password */}

                    <div className="space-y-2">

                        <Label htmlFor="password">

                            Password

                        </Label>

                        <div className="relative">

                            <LockKeyhole
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    h-5
                                    w-5
                                    text-slate-400
                                "
                            />

                            <Input

                                id="password"

                                name="password"

                                type="password"

                                placeholder="Enter your password"

                                value={formData.password}

                                onChange={handleChange}

                                className="pl-10 h-12"

                            />

                        </div>

                    </div>

                    {
                        mode === "register" && (

                            <div className="space-y-2">

                                <Label htmlFor="confirmPassword">

                                    Confirm Password

                                </Label>

                                <div className="relative">

                                    <ShieldCheck
                                        className="
                                            absolute
                                            left-3
                                            top-1/2
                                            -translate-y-1/2
                                            h-5
                                            w-5
                                            text-slate-400
                                        "
                                    />

                                    <Input

                                        id="confirmPassword"

                                        name="confirmPassword"

                                        type="password"

                                        placeholder="Confirm your password"

                                        value={formData.confirmPassword}

                                        onChange={handleChange}

                                        className="pl-10 h-12"

                                    />

                                </div>

                            </div>

                        )
                    }
                    {
                        error && (

                            <p
                                className="
                                    text-sm
                                    text-red-500
                                "
                            >

                                {error}

                            </p>

                        )
                    }
                    <Button

                        type="submit"

                        className="
                            w-full
                            h-12
                            rounded-xl
                            text-base
                            font-semibold
                        "

                        disabled={loading}

                    >

                        {

                            loading ?

                                <>

                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                                    {mode === "login"
                                        ? "Signing In..."
                                        : "Creating Account..."}

                                </>

                                :

                                mode === "login"
                                ? "Sign In"
                                : "Create Account"
                        }

                    </Button>
                </form>

            </CardContent>

            <CardFooter
                className="
                    flex
                    justify-center
                    text-sm
                "
            >

                {
                    mode === "login" ? (

                        <p className="text-slate-500">

                            Don't have an account?

                            <Link

                                to="/register"

                                className="
                                    ml-2
                                    font-semibold
                                    text-blue-600
                                    hover:underline
                                "

                            >

                                Register

                            </Link>

                        </p>

                    ) : (

                        <p className="text-slate-500">

                            Already have an account?

                            <Link

                                to="/login"

                                className="
                                    ml-2
                                    font-semibold
                                    text-blue-600
                                    hover:underline
                                "

                            >

                                Sign In

                            </Link>

                        </p>

                    )
                }

            </CardFooter>

        </Card>

    );

};

export default AuthForm;