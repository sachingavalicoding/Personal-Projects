import React, { useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import Button from "../../components/Button.jsx";
import {
    FiUserPlus,
    FiUser,
    FiMail,
    FiLock,
    FiCheck,
    FiX,
} from "react-icons/fi";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link } from "react-router-dom";

const Signup = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Remove error when user starts correcting the field
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        } else if (formData.name.trim().length < 3) {
            newErrors.name = "Name must be at least 3 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
            newErrors.name = "Name can contain only letters";
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Enter a valid email address";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password =
                "Password must contain at least one uppercase letter";
        } else if (!/[a-z]/.test(formData.password)) {
            newErrors.password =
                "Password must contain at least one lowercase letter";
        } else if (!/[0-9]/.test(formData.password)) {
            newErrors.password =
                "Password must contain at least one number";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            newErrors.password =
                "Password must contain at least one special character";
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (
            formData.password !== formData.confirmPassword
        ) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        setLoading(true);

        try {
            // API call will come here later
            console.log("Signup Data:", formData);

            // Example:
            // const response = await signupUser(formData);

        } catch (error) {
            console.error("Signup failed:", error);
        } finally {
            setLoading(false);
        }
    };

    // Input class
    const inputClass = (field) => `
        w-full rounded-xl
        border
        ${errors[field]
            ? "border-red-500/70 focus:border-red-500"
            : "border-white/10 focus:border-indigo-500/60"
        }
        bg-black/20
        py-3.5 pl-11 pr-12
        text-white placeholder-gray-500
        outline-none
        transition-all duration-300
        focus:bg-white/[0.08]
        focus:ring-2
        ${errors[field]
            ? "focus:ring-red-500/20"
            : "focus:ring-indigo-500/20"
        }
    `;

    return (
        <>
            <Navbar />

            <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-4 py-12">

                {/* Background Glow */}
                <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-indigo-600/20 blur-[120px]" />

                <div className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-purple-600/20 blur-[120px]" />

                {/* Signup Card */}
                <div className="relative w-full max-w-md">

                    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl">

                        {/* Header */}
                        <div className="mb-7 text-center">

                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
                                <FiUserPlus className="text-2xl text-white" />
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight text-white">
                                Create Account
                            </h2>

                            <p className="mt-2 text-sm text-gray-400">
                                Create your account to get started
                            </p>

                        </div>

                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit}
                            noValidate
                        >

                            {/* ================= NAME ================= */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Full Name
                                </label>

                                <div className="relative">

                                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                                    <input
                                        value={formData.name}
                                        onChange={handleChange}
                                        name="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        className={inputClass("name")}
                                    />

                                    {formData.name && !errors.name && (
                                        <FiCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400" />
                                    )}

                                </div>

                                {errors.name && (
                                    <p className="mt-1.5 text-xs text-red-400">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* ================= EMAIL ================= */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Email
                                </label>

                                <div className="relative">

                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                                    <input
                                        value={formData.email}
                                        onChange={handleChange}
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className={inputClass("email")}
                                    />

                                    {formData.email && !errors.email && (
                                        <FiCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400" />
                                    )}

                                </div>

                                {errors.email && (
                                    <p className="mt-1.5 text-xs text-red-400">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* ================= PASSWORD ================= */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Password
                                </label>

                                <div className="relative">

                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                                    <input
                                        value={formData.password}
                                        onChange={handleChange}
                                        type={
                                            isShowPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        placeholder="Create a password"
                                        className={inputClass("password")}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsShowPassword(
                                                !isShowPassword
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-indigo-400"
                                    >
                                        {isShowPassword ? (
                                            <LuEye />
                                        ) : (
                                            <LuEyeClosed />
                                        )}
                                    </button>

                                </div>

                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-400">
                                        {errors.password}
                                    </p>
                                )}

                                {/* Password Rules */}
                                {formData.password && (
                                    <div className="mt-2 space-y-1 text-xs">

                                        <PasswordRule
                                            valid={formData.password.length >= 8}
                                            text="At least 8 characters"
                                        />

                                        <PasswordRule
                                            valid={/[A-Z]/.test(formData.password)}
                                            text="One uppercase letter"
                                        />

                                        <PasswordRule
                                            valid={/[a-z]/.test(formData.password)}
                                            text="One lowercase letter"
                                        />

                                        <PasswordRule
                                            valid={/[0-9]/.test(formData.password)}
                                            text="One number"
                                        />

                                        <PasswordRule
                                            valid={/[!@#$%^&*(),.?":{}|<>]/.test(
                                                formData.password
                                            )}
                                            text="One special character"
                                        />

                                    </div>
                                )}
                            </div>

                            {/* ================= CONFIRM PASSWORD ================= */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Confirm Password
                                </label>

                                <div className="relative">

                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                                    <input
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        type={
                                            isShowConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        className={inputClass(
                                            "confirmPassword"
                                        )}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsShowConfirmPassword(
                                                !isShowConfirmPassword
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-indigo-400"
                                    >
                                        {isShowConfirmPassword ? (
                                            <LuEye />
                                        ) : (
                                            <LuEyeClosed />
                                        )}
                                    </button>

                                </div>

                                {errors.confirmPassword && (
                                    <p className="mt-1.5 text-xs text-red-400">
                                        {errors.confirmPassword}
                                    </p>
                                )}

                                {formData.confirmPassword &&
                                    !errors.confirmPassword &&
                                    formData.password ===
                                    formData.confirmPassword && (
                                        <p className="mt-1.5 flex items-center gap-1 text-xs text-emerald-400">
                                            <FiCheck />
                                            Passwords match
                                        </p>
                                    )}
                            </div>

                            {/* ================= BUTTON ================= */}
                            <div className="pt-3">

                                <Button
                                    type="submit"
                                    icon={<FiUserPlus />}
                                    loading={loading}
                                    disabled={loading}
                                    className="w-full"
                                >
                                    Create Account
                                </Button>

                            </div>

                        </form>

                        {/* Footer */}
                        <div className="mt-7 text-center">

                            <p className="text-sm text-gray-400">
                                Already have an account?{" "}

                                <Link
                                    to="/login"
                                    className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
                                >
                                    Login
                                </Link>

                            </p>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};


// Password validation indicator
const PasswordRule = ({ valid, text }) => {
    return (
        <div
            className={`flex items-center gap-2 ${valid
                ? "text-emerald-400"
                : "text-gray-500"
                }`}
        >
            {valid ? <FiCheck /> : <FiX />}
            <span>{text}</span>
        </div>
    );
};

export default Signup;

