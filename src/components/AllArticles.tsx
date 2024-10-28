"use client";

import Link from "next/link";

import { createdPost } from "@/libs/constants";
import { useFetch } from "@/hooks/getPosts";

const AllArticles: React.FC = () => {
  const { data: posts } = useFetch<createdPost[]>("/api/posts");

  return (
    <article className="max-w-full mx-auto p-6 bg-white shadow-md lg:rounded-md lg:border-2  lg:mb-4">
      <h2 className="text-3xl font-bold mb-4">All Articles</h2>
      <ul className="flex flex-col gap-4">
        {(posts || [])
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((post) => (
            <li key={post.id} className="">
              <Link href={`/${post.id}`}>
                <h3 className="font-semibold text-accent hover:underline hover:text-accent-hover ">
                  {post.mainTitle}
                </h3>
              </Link>
            </li>
          ))}
      </ul>
    </article>
  );
};

export default AllArticles;
