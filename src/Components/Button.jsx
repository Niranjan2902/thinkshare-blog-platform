
function Button({
    children,
    type = 'button',
    bgColor = "bg-blue-600",
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;

// In this components we make one common Btn for the anywhere Btn uae. 
// now we can directly use this componenets any where we need a Btn. 