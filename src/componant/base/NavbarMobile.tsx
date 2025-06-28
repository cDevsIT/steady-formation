"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "../ui/Image";

interface NavbarProps { }

const NavbarMobile: React.FC<NavbarProps> = ({ }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Success Stories", href: "/success-stories" },
        { name: "Contact US", href: "/contact-us" },
        { name: "Blog", href: "/blog" },
        { name: "Affiliate", href: "/affiliate" },
    ];

    return (
        <>
            <div className="max-w-[1512px] mx-auto md:hidden ">
                <div className="flex justify-between items-center h-17">
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

                    {/* Mobile menu button */}
                    <div className="">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <Image
                                    className="block h-6 w-6"
                                    url="/icons/close.svg"
                                    alt="Close Menu"
                                />
                            ) : (
                                <Image
                                    className="block h-6 w-6"
                                    url="/icons/menu.svg"
                                    alt="Open Menu"
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-purple-100 shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-purple-600 block px-3 py-2 text-base font-medium hover:bg-purple-50 rounded-md transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            className="bg-purple-600 hover:bg-purple-700 text-white block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 mt-4"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavbarMobile;
