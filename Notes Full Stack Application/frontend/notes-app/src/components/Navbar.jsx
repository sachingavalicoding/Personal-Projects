import React from "react";
import Button from "./Button.jsx";
import {
    CiLogout,
    CiSearch,
} from "react-icons/ci";

const Navbar = () => {
    return (
        <nav className="
            sticky top-0 left-0 z-50
            flex items-center justify-between
            border-b border-white/10
            bg-white/80
            px-6 py-3
            shadow-sm
            backdrop-blur-xl
        ">

            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="
                    flex h-9 w-9 items-center justify-center
                    rounded-xl
                    bg-gradient-to-br from-indigo-500 to-purple-600
                    text-white
                    shadow-md shadow-indigo-500/20
                ">
                    <span className="text-lg font-bold">
                        N
                    </span>
                </div>

                <h2 className="
                    text-xl font-bold
                    tracking-tight
                    text-gray-900
                ">
                    Notes
                </h2>
            </div>


            {/* Search */}
            <div className="hidden w-full max-w-md md:block">

                <div className="relative">

                    <CiSearch className="
                        absolute left-4 top-1/2
                        -translate-y-1/2
                        text-xl text-gray-400
                    " />

                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search notes..."
                        className="
                            w-full
                            rounded-xl
                            border border-gray-200
                            bg-gray-50
                            py-2.5
                            pl-11 pr-4
                            text-sm text-gray-800
                            placeholder-gray-400
                            outline-none
                            transition-all duration-300
                            focus:border-indigo-400
                            focus:bg-white
                            focus:ring-4
                            focus:ring-indigo-500/10
                        "
                    />

                </div>

            </div>


            {/* User Section */}
            <div className="flex items-center gap-3">

                {/* User Avatar */}
                <div className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-indigo-500
                    to-purple-600
                    text-sm font-semibold
                    text-white
                    shadow-md shadow-indigo-500/20
                ">
                    SG
                </div>

                {/* User Name */}
                <div className="hidden text-right sm:block">
                    <p className="
                        text-sm font-semibold
                        text-gray-800
                    ">
                        Sachin Gavali
                    </p>

                    <p className="
                        text-xs
                        text-gray-400
                    ">
                        Personal Notes
                    </p>
                </div>

                {/* Logout */}
                <Button
                    type="button"
                    icon={<CiLogout />}
                    variant="ghost"
                    className="
                        !w-auto
                        !px-3
                        !text-gray-600
                        hover:!text-red-500
                        hover:!bg-red-50
                    "
                    aria-label="Logout"
                >
                    <span className="hidden md:inline">
                        Logout
                    </span>
                </Button>

            </div>

        </nav>
    );
};

export default Navbar;
