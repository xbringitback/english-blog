import AllArticles from "@/components/AllArticles";
import RecentPosts from "@/components/RecentPosts";
import Link from "next/link";
import { tools } from "@/libs/constants";

const Tools = () => {
  return (
    <>
      <div className="lg:container lg:mx-auto h-full">
        <div className="flex flex-col lg:pb-12">
          <div className="flex max-lg:flex-col mb-8">
            <div className="lg:max-w-[65%] lg:mr-8">
              <article className="max-w-full p-6 bg-white shadow-md lg:rounded-md lg:border-2 lg:mb-4 text">
                <div className="border-b pb-6 mb-4">
                  <div className="mb-4">
                    <h3 className="text-accent text-3xl font-semibold mb-4">
                      Tools and Softwares
                    </h3>
                    <p className="text">
                      Learning English can be challenging, but with the right
                      resources and a clear plan, progress can be made quickly.
                      Here's a list of proven tools, helpful software and
                      valuable tips to help you write, read and speak English.
                    </p>
                  </div>
                  <ul className="list-disc flex flex-col gap-2 pl-8">
                    {tools.map((tool, index) => (
                      <li key={index}>
                        <Link
                          href={tool.href}
                          className="flex justify-start items-start"
                        >
                          <p className="text-accent hover:text-accent-hover pl-2 duration-100 ease-in">
                            {tool.name}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              <RecentPosts />
            </div>
            <div>
              <AllArticles />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tools;
