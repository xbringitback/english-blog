//! Links
export interface LinkItem {
  name: string;
  path: string;
}

export const links: LinkItem[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Create",
    path: "/create",
  },
  {
    name: "Tools",
    path: "/tools",
  },
  {
    name: "About me",
    path: "/about",
  },
  {
    name: "Login",
    path: "/login",
  },
];

//! Posts
export interface Section {
  title: string;
  content: string;
}

export interface createdPost {
  id: string;
  mainTitle: string;
  mainContent: string;
  author: string;
  additionalSections: Section[];
  createdAt: string;
}

//! tools

export interface Tool {
  name: string;
  href: string;
}

export const tools: Tool[] = [
  { name: "Language learning apps", href: "/" },
  { name: "Grammar and writing tools", href: "/" },
  { name: "Vocabulary trainer", href: "/" },
  { name: "Improve reading and listening comprehension", href: "/" },
  { name: "Language exchange and conversation tools", href: "/" },
  { name: "Online tutors and courses", href: "/" },
];
