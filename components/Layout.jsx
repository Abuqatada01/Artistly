import React from "react";

export default function Layout({ children }) {
  return (
    <div className="bg-gradient-to-bl from-white via-blue-50 to-pink-50 text-gray-800">
      {children}
    </div>
  );
}
