"use client";
import Link from 'next/link';
import Image from '../ui/Image';
import Button from '../ui/Button';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();
    const isClientRoute = pathname.startsWith('/client');
    const hideHeaderFooter = pathname.startsWith('/login') || pathname.startsWith('/sign-up');

    const links = [
        { name: 'About Us', href: '/about' },
        { name: 'Terms & Conditions', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Refund Policy', href: '/refund' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Services', href: '/services'}
    ];

    const socialLinks = [
        { name: 'Facebook', icon: '/icons/facebook.svg', href: 'https://facebook.com/steadyformation' },
        { name: 'Skype', icon: '/icons/skype.svg', href: 'https://skype.com/steadyformation' },
        { name: 'Twitter', icon: '/icons/twitter.svg', href: 'https://linkedin.com/company/steadyformation' },
        { name: 'Linkedin', icon: '/icons/linkedin.svg', href: 'https://instagram.com/steadyformation' },
    ];

    if (isClientRoute || hideHeaderFooter) return null;

    return (
        <footer className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 lg:px-4 lg:pt-10">
            <div className="max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto py-12">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                    {/* Company Info */}
                    <div className="space-y-4 max-w-[283px]">
                        <div className="flex items-center space-x-2">
                            <Image className='h-[48px] ' width={200} height={48} url='/steady-formation-logo.svg' alt='Steady Formation Logo' />
                        </div>
                        <p className="text-black text-[16px] leading-relaxed max-w-xs">
                            Steady Formation helps entrepreneurs and companies set up their businesses with precision, speed, and reliable expertise.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        className="bg-gray-200 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors duration-200 group"
                                        aria-label={social.name}
                                    >
                                        <Image className='h-[30px] w-[30px]' url={Icon} alt={social.name} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-4 max-w-[150px]">
                        <h3 className="text-[16px] font-medium text-gray-600 uppercase tracking-wider">LINKS</h3>
                        <ul className="space-y-3">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-black hover:text-purple-600 text-[16px] font-medium transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info */}
                    <div className="space-y-4 max-w-[271px]">
                        <h3 className="text-[16px] font-medium text-gray-600 uppercase tracking-wider">INFO</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Image className='h-4 w-4 mt-0.5 flex-shrink-0' url='/icons/map_pin.svg' alt='Map Pin' />
                                <div className="text-[16px] font-medium text-black">
                                    <div>75 E 3RD ST STE </div>
                                    <div>A70 SHERIDAN, WY 82801</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image className='h-4 w-4 mt-0.5 flex-shrink-0' url='/icons/call.svg' alt='Call' />
                                <span className="text-[16px] font-medium text-black">+1 (307) 400-1051</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image className='h-4 w-4 mt-0.5 flex-shrink-0' url='/icons/mail.svg' alt='Mail' />
                                <span className="text-[16px] font-medium text-black">info@steadyformation.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4 max-w-[260px]">
                        <h3 className="text-[16px] font-medium text-gray-600 uppercase tracking-wider">NEWSLETTER</h3>
                        <p className="text-[16px] font-medium text-black">
                            Sign up to get updates & news.
                        </p>
                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-3 py-2 h-[50px] text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <Button>Subscribe Now</Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className='border-t border-gray-200 mt-8 pt-8'>
                    <div className='flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0'>
                        <span className="text-sm block text-black md:w-auto text-center lg:text-start">
                            © {currentYear} All Rights Reserved by Steady Formation
                        </span>
                        <div className='flex justify-center items-center gap-4'>
                            <span className="text-sm text-black block">We Accept</span>
                            <div className="flex justify-center items-center gap-2 max-w-[206px]">
                                <Image className="h-[24px] w-full" url="/icons/master_card.svg" alt="MasterCard" />
                                <Image className="h-[24px] w-full" url="/icons/paypal.svg" alt="PayPal" />
                                <Image className="h-[24px] w-full" url="/icons/visa.svg" alt="Visa" />
                            </div>
                        </div>
                        <div className='flex gap-8'>
                            <Link href="/privacy" className="text-black block text-sm hover:text-purple-600 transition-colors whitespace-nowrap">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-black block text-sm hover:text-purple-600 transition-colors whitespace-nowrap">
                                Terms of Use
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}