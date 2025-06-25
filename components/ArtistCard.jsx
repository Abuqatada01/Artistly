import React from "react";

export default function ArtistCard({ artist }) {
  return (
    <div className="bg-gradient-to-br from-white via-teal-50 to-pink-50 border border-teal-100 rounded-xl shadow hover:shadow-lg transition p-5">
      <h2 className="text-xl font-bold text-teal-800 mb-1">{artist.name}</h2>
      <p className="text-sm text-gray-600 font-medium mb-1">
        Category:{" "}
        <span className="font-semibold text-teal-600">{artist.category}</span>
      </p>
      <p className="text-sm text-gray-600 mb-1">
        Fee Range: <span className="font-semibold">{artist.feeRange}</span>
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Location: <span className="font-semibold">{artist.location}</span>
      </p>
      <button className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition">
        Ask for Quote
      </button>
    </div>
  );
}
