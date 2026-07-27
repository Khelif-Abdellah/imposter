function Button({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  disabled = false,
  className = "",
  ...props
}) {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-200 focus:outline-none";

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500",

    secondary:
      "border border-slate-600 bg-transparent text-white hover:bg-slate-800",

    danger: "bg-red-600 text-white hover:bg-red-500",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
          ${baseStyle}
          ${variants[variant]}
          ${fullWidth ? "w-full" : ""}
          ${disabled ? "cursor-not-allowed opacity-50" : ""}
          ${className}
        `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
