"use client";

import AllArticles from "@/components/AllArticles";
import RecentPosts from "@/components/RecentPosts";

import { createdPost } from "@/libs/constants";
import { useFetch } from "@/hooks/getPosts";
import SearchPosts from "@/components/SearchPosts";
import { RiExpandUpDownFill } from "react-icons/ri";

import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";

const DetailPage = ({ params }: { params: { slug: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: post } = useFetch<createdPost>(`/api/posts?id=${params.slug}`);

  const toggleWindow = () => {
    setIsOpen(!isOpen);
  };

  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div className="lg:container lg:mx-auto h-full">
      <div className="flex flex-col lg:pb-12">
        <div className="flex max-lg:flex-col mb-8">
          <div className="lg:max-w-[65%] lg:mr-8">
            <article className="max-w-full p-6 bg-white shadow-md lg:rounded-md lg:border-2 lg:mb-4">
              <div className="border-b">
                <div className="border-b mb-8">
                  <h3 className="text-3xl font-semibold text-accent mb-1">
                    {post.mainTitle}
                  </h3>
                  <div className="text-gray-500 flex gap-1 mb-4 text-sm">
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
                  <div className="flex flex-col justify-center">
                    <p className="mb-8">{post.mainContent}</p>
                    <div className="px-2">
                      <div
                        className="flex justify-between mb-2 cursor-pointer"
                        onClick={toggleWindow}
                      >
                        <p className="text-lg">Content</p>
                        <div className="">
                          <RiExpandUpDownFill className="text-premium text-[24px]" />
                        </div>
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isOpen
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <ul className="flex flex-col gap-2 mb-4">
                          {post.additionalSections.map((section, index) => (
                            <li
                              key={index}
                              className="font-semibold text-accent"
                            >
                              {section.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  {post.additionalSections.map(
                    (
                      section: { title: string; content: string },
                      index: number
                    ) => (
                      <div key={index} className="mb-8">
                        <h3 className="font-semibold text-2xl leading-8 text-accent mb-4">
                          {section.title}
                        </h3>
                        <div className="">
                          <p className="">{section.content}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </article>
            <RecentPosts />
          </div>
          <div>
            <SearchPosts />
            <AllArticles />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
