import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import {
    User,
    Mail,
    LockKeyhole,
    ShieldCheck,
    Loader2,
    Eye,
    EyeOff,
    AlertCircle,
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
    onGoogleSuccess,
    onGoogleError,
}) => {

    const [formData, setFormData] = useState({

        username: "",

        email: "",

        password: "",

        confirmPassword: "",

    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

                <div className="mb-6 flex justify-center">
 
                    <div className="rounded-full bg-white p-1 ring-1 ring-slate-200 dark:ring-slate-700">
 
                        <GoogleLogin
 
                            onSuccess={onGoogleSuccess}
 
                            onError={onGoogleError}
 
                            shape="pill"
 
                            width="360"
 
                        />
 
                    </div>
 
                </div>
 
                <div className="mb-6 flex items-center gap-4">
 
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-500" />
 
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        Or continue with email
                    </span>
 
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-500" />
 
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {
                        error && (

                            <div
                                role="alert"
                                className="
                                    flex
                                    items-start
                                    gap-2
                                    rounded-xl
                                    border
                                    border-red-200
                                    bg-red-50
                                    px-4
                                    py-3
                                    text-sm
                                    text-red-700
                                "
                            >
                                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                                <span>{error}</span>
                            </div>

                        )
                    }

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

                                        autoComplete="name"

                                        placeholder="Enter your full name"

                                        value={formData.username}

                                        onChange={handleChange}

                                        disabled={loading}

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

                                autoComplete="email"

                                placeholder="Enter your email"

                                value={formData.email}

                                onChange={handleChange}

                                disabled={loading}

                                aria-invalid={!!error}

                                className="pl-10 h-12"

                            />

                        </div>

                    </div>

                    {/* Password */}

                    <div className="space-y-2">

                        <div className="flex items-center justify-between">

                            <Label htmlFor="password">

                                Password

                            </Label>

                            {/* {
                                mode === "login" && (

                                    <Link

                                        to="/forgot-password"

                                        className="
                                            text-sm
                                            font-medium
                                            text-blue-600
                                            hover:underline
                                        "

                                    >

                                        Forgot password?

                                    </Link>

                                )
                            } */}

                        </div>

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

                                type={showPassword ? "text" : "password"}

                                autoComplete={mode === "login" ? "current-password" : "new-password"}

                                placeholder="Enter your password"

                                value={formData.password}

                                onChange={handleChange}

                                disabled={loading}

                                aria-invalid={!!error}

                                className="pl-10 pr-10 h-12"

                            />

                            <button

                                type="button"

                                onClick={() => setShowPassword((prev) => !prev)}

                                tabIndex={-1}

                                aria-label={showPassword ? "Hide password" : "Show password"}

                                className="
                                    absolute
                                    right-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                    hover:text-slate-600
                                "

                            >

                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}

                            </button>

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

                                        type={showConfirmPassword ? "text" : "password"}

                                        autoComplete="new-password"

                                        placeholder="Confirm your password"

                                        value={formData.confirmPassword}

                                        onChange={handleChange}

                                        disabled={loading}

                                        className="pl-10 pr-10 h-12"

                                    />

                                    <button

                                        type="button"

                                        onClick={() => setShowConfirmPassword((prev) => !prev)}

                                        tabIndex={-1}

                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}

                                        className="
                                            absolute
                                            right-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                            hover:text-slate-600
                                        "

                                    >

                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}

                                    </button>

                                </div>

                            </div>

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