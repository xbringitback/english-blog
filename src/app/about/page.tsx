import AllArticles from "@/components/AllArticles";
import RecentPosts from "@/components/RecentPosts";

const About = () => {
  return (
    <>
      <div className="lg:container lg:mx-auto h-full">
        <div className="flex flex-col lg:pb-12">
          <div className="flex max-lg:flex-col mb-8">
            <div className="lg:max-w-[65%] lg:mr-8">
              <article className="max-w-full p-6 bg-white shadow-md lg:rounded-md lg:border-2 lg:mb-4">
                <div className="">
                  <h3 className="text-accent text-3xl mb-2 font-semibold">
                    About me
                  </h3>
                  <div className="flex flex-col gap-4 border-b pb-6 mb-4">
                    <p className="underline text-gray-500 text-base">Chris M</p>
                    <p className="">
                      Hello and welcome to my blog! I&apos;m thrilled that
                      you&apos;re here to learn more about me and my journey. My
                      career began in retail, where I worked as a trained
                      salesperson for several years. Over time, I gained
                      experience in a range of business roles, from working as
                      an insurance clerk to handling legal protection claims,
                      and even working as an all-rounder in a mail-order
                      pharmacy. These positions involved plenty of hard work,
                      and I&apos;m grateful for the lessons they taught me in
                      organization, communication, and the inner workings of
                      business processes.
                    </p>
                    <p>
                      My creativity and curiosity weren&apos;t fully engaged,
                      and I found myself searching for a new challenge.
                      That&apos;s when I discovered development and programming.
                      The idea of building something from scratch and finding
                      solutions to complex problems captivated me instantly.
                      What started as a small course quickly turned into a
                      passion, and I soon found myself spending hours immersed
                      in the world of coding. Before long, I&apos;d truly fallen
                      in love with development. Of course, the journey
                      hasn&apos;t been without its challenges.
                    </p>
                    <p>
                      A big one was learning English, an essential language in
                      the tech world. At first, adapting to this new language
                      wasn&apos;t easy, but the challenge only motivated me
                      more. Gradually, I learned the terminology, phrases, and
                      culture that are so closely linked to the tech industry.
                      English became an integral part of this new chapter in my
                      life. So, why this blog? Because I know there are others
                      out there who, like me, have faced the challenge of
                      learning English to open up new opportunities.
                    </p>
                    <p>
                      But despite these valuable experiences, something felt
                      missing. I want to share the tools, tricks, and life hacks
                      that helped make my language journey smoother. Here,
                      I&apos;ll focus on specific strategies I&apos;ve used to
                      learn English effectively whether it&apos;s tips for
                      mastering technical terms, tools that helped me retain
                      vocabulary, or small shortcuts I discovered that made
                      English less intimidating. My aim is to provide real,
                      actionable insights from overcoming those early language
                      barriers to reaching a point where English feels natural
                      and intuitive.
                    </p>
                    <p>
                      I hope that by sharing my experiences, I can inspire you
                      or perhaps make your own journey into this world a bit
                      easier.
                    </p>
                    <p className="">
                      Thank you for being part of my journey and maybe I&apos;ll
                      have the chance to be part of yours too!
                    </p>
                  </div>
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

export default About;
