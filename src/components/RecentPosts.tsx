"use client";

import Link from "next/link";
import { format } from "date-fns";
import { createdPost } from "@/libs/constants";
import { useFetch } from "@/hooks/getPosts";

const RecentPosts: React.FC = () => {
  const { data: posts } = useFetch<createdPost[]>("/api/posts");

  return (
    <article className="max-w-full mx-auto p-6 lg:mb-4 bg-white shadow-md lg:rounded-md lg:border-2">
      <h2 className="text-3xl font-bold mb-4">Recent Posts</h2>
      <ul className="space-y-4">
        {(posts || []).slice(-5).map((post) => (
          <li key={post.id} className="border-b pb-4">
            <Link href={`/${post.id}`}>
              <h3 className="text-2xl font-semibold text-accent hover:underline hover:text-accent-hover mb-1">
                {post.mainTitle}
              </h3>
            </Link>
            <div className="text-gray-500 text-sm mb-4 flex gap-1">
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
            <div className="">
              <p>{post.mainContent}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default RecentPosts;
