"use client";

import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { databases } from "../../lib/appwrite";
export default function DashboardPage() {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID
      );
      setArtists(res.documents);
    };

    fetchArtists();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-teal-700">
        Artist Submissions
      </h1>

      <Table
        columns={["Name", "Category", "City", "Fee"]}
        data={artists}
        actions={{ label: "Review" }}
        onAction={(artist) => setSelectedArtist(artist)}
      />

      {/* Modal */}
      {selectedArtist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">{selectedArtist.name}</h2>
            <p>
              <strong>Category:</strong> {selectedArtist.category}
            </p>
            <p>
              <strong>Location:</strong> {selectedArtist.location}
            </p>
            <p>
              <strong>Fee Range:</strong> {selectedArtist.feeRange}
            </p>
            <p>
              <strong>Bio:</strong> {selectedArtist.bio}
            </p>

            <div className="flex justify-end gap-2 mt-6">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => {
                  // Add your approve logic here
                  alert("Approved!");
                  setSelectedArtist(null);
                }}
              >
                Approve
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => {
                  // Add your reject logic here
                  alert("Rejected!");
                  setSelectedArtist(null);
                }}
              >
                Reject
              </button>
              <button
                className="ml-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setSelectedArtist(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
