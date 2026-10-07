
import React, { useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import Button from "../../components/Button.jsx";
import { FiLogIn, FiUser, FiLock } from "react-icons/fi";
import { LuEyeClosed } from "react-icons/lu"
import { Link } from "react-router-dom";


const Login = () => {

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlePasswordVisibility = () => {
        setIsShowPassword(!isShowPassword);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password, "input Data");
    }
    return (
        <>
            <Navbar />

            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-4 py-12">

                {/* Background Glow */}
                <div className="absolute top-32 left-1/4 h-72 w-72 rounded-full bg-indigo-600/20 blur-[120px]" />
                <div className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-purple-600/20 blur-[120px]" />

                {/* Login Card */}
                <div className="relative w-full max-w-md">

                    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl">

                        {/* Header */}
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
                                <FiLogIn className="text-2xl text-white" />
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight text-white">
                                Welcome Back
                            </h2>

                            <p className="mt-2 text-sm text-gray-400">
                                Login to continue to your account
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>

                            {/* Username */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Username
                                </label>

                                <div className="relative">
                                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="email"
                                        type="text"
                                        placeholder="Enter your email"
                                        className="
                                            w-full rounded-xl
                                            border border-white/10
                                            bg-black/20
                                            py-3.5 pl-11 pr-4
                                            text-white placeholder-gray-500
                                            outline-none
                                            transition-all duration-300
                                            focus:border-indigo-500/60
                                            focus:bg-white/[0.08]
                                            focus:ring-2 focus:ring-indigo-500/20
                                        "
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Password
                                </label>

                                <div className="relative">
                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={isShowPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        className="
                                            w-full rounded-xl
                                            border border-white/10
                                            bg-black/20
                                            py-3.5 pl-11 pr-4
                                            text-white placeholder-gray-500
                                            outline-none
                                            transition-all duration-300
                                            focus:border-indigo-500/60
                                            focus:bg-white/[0.08]
                                            focus:ring-2 focus:ring-indigo-500/20
                                        "
                                    />
                                    <LuEyeClosed onClick={() => handlePasswordVisibility()} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            {/* Login Button */}
                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    icon={<FiLogIn />}
                                    className="w-full"
                                >
                                    Login
                                </Button>
                            </div>

                        </form>

                        {/* Footer */}
                        <div className="mt-7 text-center">
                            <p className="text-sm text-gray-400">
                                Don't have an account?{" "}
                                <Link to="/signup">
                                    <button
                                        type="button"
                                        className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
                                    >
                                        Create Account
                                    </button>
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

