
import Link from "next/link";
import Image from "../ui/Image";
import NavbarMobile from "./NavbarMobile";

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = ({ }) => {

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Contact US", href: "/contact-us" },
    { name: "Blog", href: "/blog" },
    { name: "Affiliate", href: "/affiliate" },
  ];

  return (
    <nav
      className={`bg-transparent sticky top-0 z-50 backdrop-blur-lg  px-4 sm:px-6 lg:px-4`}
    >
      <div className="max-w-[1512px] mx-auto hidden md:block">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                className="h-8 w-full"
                url="/steady-formation-logo.svg"
                alt="Steady Formation Logo"
                width={112}
                height={42}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-hover px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-purple-50 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <Link
              href="/login"
              className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
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
