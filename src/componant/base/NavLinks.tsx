'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Success Stories", href: "/success-stories" },
  { name: "Contact US", href: "/contact-us" },
  { name: "Blog", href: "/blog" },
  { name: "Affiliate", href: "/affiliate" },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2 text-[16px] leading-24px font-medium transition-colors duration-200 rounded-md hover:text-primary-hover ${isActive
                ? "text-primary"
                : "text-black "
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavLinks;