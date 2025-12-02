"use client";
import Link from "next/link";
import Image from "../ui/Image";
import NavbarMobile from "./NavbarMobile";
import NavLinks from "./NavLinks";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLogout } from "@/lib/useLogout";
import { useCompany } from "@/contexts/CompanyContext";
import { getUserProfile, UserProfile } from "@/services/userService";
import { API_CONFIG } from "@/config/api";

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = ({ }) => {
  const pathname = usePathname();
  const isClientRoute = pathname.startsWith('/client');
  const hideHeaderFooter = pathname.startsWith('/login') || pathname.startsWith('/sign-up');
  const [isScrolled, setIsScrolled] = useState(false);
  const { handleLogout } = useLogout();
  const { companies, selectedCompany, setSelectedCompany, loading: companiesLoading } = useCompany();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    setIsLoggedIn(!!token);
  }, [pathname]);

  // Fetch user profile when on client route
  useEffect(() => {
    if (isClientRoute) {
      const fetchProfile = async () => {
        try {
          const profile = await getUserProfile();
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
      fetchProfile();
    }
  }, [isClientRoute]);

  return (
    <nav
      className={`bg-transparent sticky top-0 z-50 backdrop-blur-lg px-4 sm:px-6 lg:px-4 transition-all duration-300`}
    >
      <div className={`max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto ${isScrolled ? 'pt-0' : 'pt-[28px]'} hidden md:block transition-all duration-300`}>
        <div className="flex justify-between items-center h-17">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={"/"} className="flex items-center space-x-2">
              <Image
                className="h-[42px] w-full"
                url="/steady-formation-logo.svg"
                alt="Steady Formation Logo"
                width={112}
                height={42}
              />
            </Link>
          </div>

          {/* Desktop Navigation - Only show on main site */}
          {!isClientRoute && !hideHeaderFooter && <NavLinks />}

          {/* Desktop Login Button */}
          <div className="hidden md:block ">
            {isClientRoute ? (
              <div className="flex items-center gap-4">
                {/* Notification Button */}
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-lg">🔔</span>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Profile Button */}
                <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  {userProfile?.avatar ? (
                    <img 
                      src={`${API_CONFIG.BASE_URL.replace('/api', '')}/storage/${userProfile.avatar}`}
                      alt={`${userProfile.first_name} ${userProfile.last_name}`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {userProfile ? `${userProfile.first_name.charAt(0)}${userProfile.last_name.charAt(0)}` : 'U'}
                    </div>
                  )}
                  <span className="text-sm font-medium">
                    {userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : 'User'}
                  </span>
                </button>

                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Image
                    url="/client/log-out-icon.svg"
                    alt="Logout"
                    className="w-5 h-5"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            ) : (
              <>
                {!hideHeaderFooter && (
                  <Link
                    href={isLoggedIn ? "/client" : "/login"}
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-3 h-11 rounded-lg text-[16px] font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    {isLoggedIn ? "Dashboard" : "Login"}
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <NavbarMobile />
    </nav>
  );
};

export default Navbar;