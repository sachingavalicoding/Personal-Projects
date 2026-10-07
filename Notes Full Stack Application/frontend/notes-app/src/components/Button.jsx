import React from "react";
import { FiArrowRight, FiLoader } from "react-icons/fi";

const Button = ({
    children,
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "right",
    loading = false,
    disabled = false,
    className = "",
    ...props
}) => {
    const variants = {
        primary:
            "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 hover:shadow-indigo-500/40",

        secondary:
            "bg-white/10 text-white border border-white/10 hover:bg-white/15",

        success:
            "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-500",

        danger:
            "bg-red-600 text-white shadow-lg shadow-red-500/20 hover:bg-red-500",

        outline:
            "border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10",

        ghost:
            "text-gray-300 hover:bg-white/10 hover:text-white",
    };

    const sizes = {
        sm: "px-3 py-2 text-sm rounded-lg",
        md: "px-5 py-2.5 text-sm rounded-xl",
        lg: "px-6 py-3 text-base rounded-xl",
    };

    return (
        <button
            disabled={disabled || loading}
            className={`
        group relative inline-flex items-center justify-center gap-2
        font-medium
        transition-all duration-300 ease-out
        hover:-translate-y-0.5
        active:translate-y-0 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50
        disabled:cursor-not-allowed disabled:opacity-50
        overflow-hidden
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
            {...props}
        >
            {/* Shine animation */}
            <span
                className="
          absolute inset-0 -translate-x-full
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          group-hover:translate-x-full
          transition-transform duration-700
        "
            />

            {loading ? (
                <FiLoader className="animate-spin text-lg" />
            ) : (
                <>
                    {iconPosition === "left" && icon && (
                        <span className="transition-transform duration-300 group-hover:-translate-x-1">
                            {icon}
                        </span>
                    )}

                    <span className="relative">{children}</span>

                    {iconPosition === "right" && icon && (
                        <span className="relative transition-transform duration-300 group-hover:translate-x-1">
                            {icon}
                        </span>
                    )}
                </>
            )}
        </button>
    );
};

export default Button;