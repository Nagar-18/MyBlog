import React from "react";

export default function Buttonx({
    children,
    type = "button",
    bgColor = "bg-red-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
      <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}