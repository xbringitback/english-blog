"use client";

import { links, LinkItem } from "@/libs/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Nav: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <nav className="flex gap-8">
      {links
        .filter(
          (link) => link.name !== "Create" || session?.user?.role === "admin"
        )
        .map((link: LinkItem, index: number) => (
          <Link
            key={index}
            href={link.path}
            className={`${
              link.path === pathname
                ? "text-accent border-b-2 border-accent"
                : "hover:text-accent-hover"
            } text-base `}
          >
            {link.name}
          </Link>
        ))}
    </nav>
  );
};

export default Nav;
