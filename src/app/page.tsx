import AllArticles from "@/components/AllArticles";
import Newsletter from "@/components/Newsletter";
import RecentPosts from "@/components/RecentPosts";
import SearchPosts from "@/components/SearchPosts";

const Home: React.FC = () => {
  return (
    <div className="lg:container lg:mx-auto h-full">
      <div className="flex flex-col lg:pb-12">
        <div className="flex max-lg:flex-col mb-8">
          <div className="lg:max-w-[65%] lg:mr-8">
            <Newsletter />
            <RecentPosts />
          </div>
          <div className="">
            <SearchPosts />
            <AllArticles />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
