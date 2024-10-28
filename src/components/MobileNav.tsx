"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { links, LinkItem } from "@/libs/constants";
import Logo from "../../public/assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { useSession } from "next-auth/react";

const MobileNav: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonLarge, setIsButtonLarge] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsButtonLarge(true);
    setTimeout(() => setIsButtonLarge(false), 300);
  };

  return (
    <div className="flex gap-6 items-center justify-center">
      <Link href={"/search?query="} className="max-lg:order-1">
        <FaSearch className="text-premium text-2xl" />
      </Link>
      <button onClick={toggleMenu} className="">
        <div className="space-y-2">
          <span className="block w-8 h-[3px] bg-premium"></span>
          <span className="block w-8 h-[3px] bg-premium"></span>
          <span className="block w-8 h-[3px] bg-premium"></span>
        </div>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center bg-primary">
          <button
            onClick={closeMenu}
            className={`fixed top-8 right-4 p-2 z-90 transition-transform duration-300 ${
              isButtonLarge ? "scale-125" : ""
            }`}
          >
            <div className="space-y-2">
              <span className="block w-[39.5px] h-1 bg-red-700 rotate-[50deg] translate-y-[6px]"></span>
              <span className="block w-10 h-1 bg-red-700 -rotate-[50deg] -translate-y-1.5"></span>
            </div>
          </button>
          <div className="mt-16 m-10 text-center flex flex-col items-center justify-center gap-4">
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo"
                width={100}
                height={100}
                className="h-20 w-40 rounded-lg"
              />
            </Link>

            {/* <h2 className="text-4xl font-semibold">
              <p>
                <span className="text-accent">English </span>
                Journey
              </p>
            </h2> */}
          </div>
          <nav className="flex flex-col justify-center items-center gap-8">
            {links
              .filter(
                (link) =>
                  link.name !== "Create" || session?.user?.role === "admin"
              )
              .map((link: LinkItem, index: number) => (
                <Link
                  key={index}
                  href={link.path}
                  className={`${
                    link.path === pathname
                      ? "text-accent border-b-2 border-accent "
                      : ""
                  } text-2xl font-semibold`}
                  onClick={handleLinkClick}
                >
                  {link.name}
                </Link>
              ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
