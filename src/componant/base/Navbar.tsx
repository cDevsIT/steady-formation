
import Link from "next/link";
import Image from "../ui/Image";
import NavbarMobile from "./NavbarMobile";
import NavLinks from "./NavLinks";

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = ({ }) => {


  return (
    <nav
      className={`bg-transparent sticky top-0 z-50 backdrop-blur-lg  px-4 sm:px-6 lg:px-4`}
    >
      <div className="max-w-[1280px] mx-auto hidden md:block">
        <div className="flex justify-between items-center h-17">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                className="h-[42px] w-full"
                url="/steady-formation-logo.svg"
                alt="Steady Formation Logo"
                width={112}
                height={42}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavLinks/>

          {/* Desktop Login Button */}
          <div className="hidden md:block ">
            <Link
              href="/login"
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3  h-11 rounded-lg text-[16px] font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <NavbarMobile />

    </nav>
  );
};

export default Navbar;
