"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { createdPost } from "@/libs/constants";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); //
  const query = searchParams ? searchParams.get("query") : "";
  const [searchTerm, setSearchTerm] = useState(query || "");
  const [posts, setPosts] = useState<createdPost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        setLoading(true);
        try {
          const res = await fetch(`/api/posts?search=${query}`);
          if (res.ok) {
            const data = await res.json();
            setPosts(data);
          } else {
            console.error("Error fetching posts");
          }
        } catch (error) {
          console.error("Failed to search posts:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${searchTerm}`);
  };

  return (
    <div className="">
      <div className="max-w-full mx-auto p-2 bg-white shadow-md lg:rounded-md lg:border-2 lg:mb-4">
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
            {loading ? "..." : "Search"}
          </button>
        </form>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <article className="max-w-full p-6 bg-white shadow-md lg:rounded-md lg:border-2 lg:mb-4">
          <div className="">
            <h2 className="text-3xl font-bold mb-4">
              Search Results for: "{query}"
            </h2>
            {posts.length > 0 ? (
              <ul className="">
                {posts.map((post) => (
                  <li key={post.id} className="border-b mb-4 pb-4">
                    <div className="">
                      <Link href={`/${post.id}`}>
                        <h3 className="text-2xl font-semibold text-accent hover:underline hover:text-accent-hover mb-1">
                          {post.mainTitle}
                        </h3>
                      </Link>
                      <div className="text-gray-500 text-base mb-4 flex gap-1">
                        <p className="">
                          {format(new Date(post.createdAt), "yyyy.MM.dd")}
                        </p>
                        <p className="pl-1">by</p>
                        <Link href={`/about`}>
                          <p className="underline hover:text-accent-hover">
                            {post.author}
                          </p>
                        </Link>
                      </div>
                      <p>{post.mainContent}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="">- No posts found -</p>
            )}
          </div>
        </article>
      )}
    </div>
  );
};

export default SearchResults;
