"use client";

import { useState } from "react";
import { createdPost } from "@/libs/constants";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CreatePost: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [post, setPost] = useState<createdPost>({
    mainTitle: "",
    mainContent: "",
    author: "",
    createdAt: "",
    id: "",
    additionalSections: [],
  });

  const handleMainChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSectionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedSections = post.additionalSections.map((section, i) =>
      i === index ? { ...section, [e.target.name]: e.target.value } : section
    );
    setPost({ ...post, additionalSections: updatedSections });
  };

  const addSection = () => {
    setPost({
      ...post,
      additionalSections: [
        ...post.additionalSections,
        { title: "", content: "" },
      ],
    });
  };

  const removeSection = (index: number) => {
    const updatedSections = post.additionalSections.filter(
      (_, i) => i !== index
    );
    setPost({ ...post, additionalSections: updatedSections });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      console.log("Creating post with data:", post);
      const resPost = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!resPost.ok) {
        const errorText = await resPost.text();
        console.error(
          `Error creating post: ${resPost.status} ${resPost.statusText} - ${errorText}`
        );
        throw new Error("Error creating post");
      }
      const createdPost = await resPost.json();

      router.push(`/${createdPost.id}`);
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (session?.user.role !== "admin") {
    return (
      <div className="flex justify-center items-center">
        Du hast keine Berechtigung, diese Seite zu sehen!
      </div>
    );
  }

  return (
    <div className="lg:container lg:mx-auto h-full">
      <div className="flex flex-col lg:pb-12">
        <div className="xl:flex xl:justify xl: flex max-lg:flex-col mb-8">
          <article className="mx-auto lg:w-2/4 mb-2">
            <div className="">
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div>
                  <label className="block font-semibold">Author</label>
                  <input
                    name="author"
                    type="text"
                    value={post.author}
                    onChange={handleMainChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-gray-800 focus:border-gray-800 text-premium"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">Main Title</label>
                  <input
                    name="mainTitle"
                    type="text"
                    value={post.mainTitle}
                    onChange={handleMainChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-gray-800 focus:border-gray-800 text-premium"
                    required
                  />
                </div>
                <div className="border-b pb-6">
                  <label htmlFor="" className="font-semibold">
                    Main Content
                  </label>
                  <textarea
                    name="mainContent"
                    value={post.mainContent}
                    onChange={handleMainChange}
                    className="w-full px-4 py-2 h-[300px] border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-gray-800 focus:border-gray-800 text-premium"
                    placeholder="Write something amazing..."
                    required
                  />
                </div>
                <div className="pt-2">
                  {post.additionalSections.map((section, index) => (
                    <div
                      key={index}
                      className="rounded-md mb-4 flex flex-col gap-2"
                    >
                      <div className="">
                        <div className="flex justify-between items-center">
                          <label className="block font-semibold">
                            Section Title {index + 1}
                          </label>
                          <button
                            type="button"
                            onClick={() => removeSection(index)}
                            className=" text-black hover:text-red-600 pr-1 rounded-md font-bold"
                          >
                            X
                          </button>
                        </div>
                        <input
                          name="title"
                          type="text"
                          value={section.title}
                          onChange={(e) => handleSectionChange(index, e)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-gray-800 focus:border-gray-800 text-premium"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-semibold">
                          Section Content {index + 1}
                        </label>
                        <textarea
                          name="content"
                          value={section.content}
                          onChange={(e) => handleSectionChange(index, e)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-gray-800 focus:border-gray-800 text-premium h-[300px]"
                          required
                          placeholder="Write something amazing..."
                        />
                      </div>
                      <div className="flex justify-end"></div>
                    </div>
                  ))}
                  <div className="flex flex-col justify-center items-start pr-4 border-b pb-4 mb-4">
                    <button
                      type="button"
                      onClick={addSection}
                      className="py-2 px-4 bg-blue-700 hover:bg-blue-500 text-white font-semibold rounded-md"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="py-2 px-6 bg-accent text-white font-semibold rounded-md shadow-md hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                  >
                    {loading ? "Creating..." : "Publish"}
                  </button>
                </div>
              </form>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
