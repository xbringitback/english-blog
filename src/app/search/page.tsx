import AllArticles from "@/components/AllArticles";
import RecentPosts from "@/components/RecentPosts";
import SearchResults from "@/app/search/SearchResults";
import { Suspense } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search post",
};

const SearchPage = () => {
  return (
    <div className="lg:container lg:mx-auto h-full">
      <div className="flex flex-col lg:pb-12">
        <div className="flex max-lg:flex-col mb-8">
          <div className="lg:max-w-[65%] lg:mr-8">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchResults />
            </Suspense>
            <RecentPosts />
          </div>
          <div>
            <AllArticles />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
