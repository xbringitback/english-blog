import Link from "next/link";
import Nav from "./Nav";
import Logo from "../../public/assets/logo.png";
import Image from "next/image";
import MobileNav from "./MobileNav";

const Header: React.FC = () => {
  return (
    <header className="py-6 shadow bg-white lg:mb-8 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 ">
          <Image src={Logo} alt="logo" className="h-16 w-32 rounded-lg" />
        </Link>
        <div className="max-lg:hidden">
          <Nav />
        </div>
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
