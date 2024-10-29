"use client";
import { useState } from "react";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setEmail("");
      } else {
        console.error("Error sending email");
      }
    } catch (error) {
      console.error("An unexpected error occurred.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="max-w-full mx-auto p-6 lg:mb-4 bg-white shadow-md lg:rounded-md lg:border-2 xl:min-w-[70%]">
      <div className="">
        <h1 className="text-3xl font-bold mb-4">
          Fresh Resources and Updates for Learners
        </h1>
        <p className="mb-4 font-semibold">
          Bring Your English to the Next Level:
        </p>
        <ul className="list-disc flex flex-col gap-1 pl-8 mb-8 font-semibold">
          <li>From grammar hacks and vocabulary boosts</li>
          <li>Exciting Tools to Help You Get Ahead</li>
          <li>Insightful Pronunciation Guides for Clearer Speech</li>
          <li>Engaging Listening Exercises to Train Your Ear</li>
          <li>Smart Reading Tips to Expand Vocabulary Naturally</li>
        </ul>
        <form action="" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            ></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your E-Mail Adress..."
              className="lg:w-[70%] max-sm:w-full w-[80%] px-3 py-2 mb-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="py-2 px-6 bg-accent text-white font-semibold rounded-md shadow-md hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 text-lg"
              disabled={loading}
            >
              {loading ? "Sending..." : "Subscribe Newsletter for Free"}
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default Newsletter;
