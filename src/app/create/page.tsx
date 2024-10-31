import CreatePost from "./Create";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post",
};

const CreatePage = () => {
  return (
    <div>
      <CreatePost />
    </div>
  );
};

export default CreatePage;
