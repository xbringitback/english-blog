"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchPosts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Weiterleitung zur Suchergebnisseite mit dem Suchbegriff in der URL
    router.push(`/search?query=${searchTerm}`);
    setLoading(false);
  };

  return (
    <div className="lg:mb-4">
      <div className="max-w-full mx-auto p-2 bg-white shadow-md lg:rounded-md lg:border-2">
        <form
          onSubmit={handleSearch}
          className="flex justify-around items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-gray-800 focus:border-gray-800 bg-gray-200 text-premium"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-400 ml-2 min-w-24"
            disabled={loading}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPosts;
