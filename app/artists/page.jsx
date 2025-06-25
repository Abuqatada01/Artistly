"use client";

import { useEffect, useState } from "react";
import { databases } from "../../lib/appwrite";
import ArtistCard from "../../components/ArtistCard";

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    feeRange: "",
  });

  const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await databases.listDocuments(dbId, collectionId);
        setArtists(res.documents);
        setFiltered(res.documents);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    const results = artists.filter((artist) => {
      return (
        (filters.category === "" ||
          artist.category.includes(filters.category)) &&
        (filters.location === "" ||
          artist.location
            .toLowerCase()
            .includes(filters.location.toLowerCase())) &&
        (filters.feeRange === "" || artist.feeRange === filters.feeRange)
      );
    });
    setFiltered(results);
  }, [filters, artists]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">
        Find Your Artist
      </h1>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <select
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Singer">Singer</option>
          <option value="Dancer">Dancer</option>
          <option value="Speaker">Speaker</option>
          <option value="DJ">DJ</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />

        <select
          onChange={(e) => setFilters({ ...filters, feeRange: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Price Ranges</option>
          <option value="1000-5000">₹1,000–5,000</option>
          <option value="5000-10000">₹5,000–10,000</option>
          <option value="10000+">₹10,000+</option>
        </select>
      </div>

      {/* Artist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((artist) => (
          <ArtistCard key={artist.$id} artist={artist} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No matching artists found.
        </p>
      )}
    </div>
  );
}
