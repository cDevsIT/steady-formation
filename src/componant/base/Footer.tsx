import Link from 'next/link';
import Image from '../ui/Image';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const links = [
        { name: 'About Us', href: '/about' },
        { name: 'Terms & Conditions', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Refund Policy', href: '/refund' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact Us', href: '/contact' },
    ];

    const socialLinks = [
        { name: 'Facebook', icon: '/icons/facebook.svg', href: 'https://facebook.com/steadyformation' },
        { name: 'Skype', icon: '/icons/skype.svg', href: 'https://skype.com/steadyformation' },
        { name: 'Twitter', icon: '/icons/twitter.svg', href: 'https://linkedin.com/company/steadyformation' },
        { name: 'Linkedin', icon: '/icons/linkedin.svg', href: 'https://instagram.com/steadyformation' },
    ];

    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-[1512px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4 lg:col-span-2">
                        <div className="flex items-center space-x-2">
                            <Image className='w-[150px]' url='/steady_formation_logo.svg' alt='Steady Formation Logo' />
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                            Steady Formation is a business formation company that specializes in providing high-quality business formation services.
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
                                        <Image className='h-8 w-8' url={Icon} alt={social.name} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-4 lg:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">LINKS</h3>
                        <ul className="space-y-3">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-purple-600 text-sm transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info */}
                    <div className="space-y-4 lg:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">INFO</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Image className='h-4 w-4 mt-0.5 flex-shrink-0' url='/icons/map_pin.svg' alt='Map Pin' />
                                <div className="text-sm text-gray-600">
                                    <div>455 West Orchard Street</div>
                                    <div>Kings Mountain, NC 28086</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image className='h-4 w-4 mt-0.5 flex-shrink-0' url='/icons/call.svg' alt='Call' />
                                <span className="text-sm text-gray-600">+1 (123) 985 789</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image className='h-4 w-4 mt-0.5 flex-shrink-0' url='/icons/mail.svg' alt='Mail' />
                                <span className="text-sm text-gray-600">help@steadyformation.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4 lg:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">NEWSLETTER</h3>
                        <p className="text-sm text-gray-600">
                            Sign up to get updates & news.
                        </p>
                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <button className="w-full bg-[#7856FC] hover:bg-[#7756fcc7] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">

                        {/* Left: Copyright */}
                        <span className="text-sm text-gray-500 whitespace-nowrap w-full md:w-auto">
                            © {currentYear} All Rights Reserved by Steady Formation
                        </span>

                        {/* Middle: Payments */}
                        <div className="flex items-center gap-2 flex-nowrap w-full md:w-auto">
                            <span className="text-sm text-gray-600 whitespace-nowrap">We Accept</span>
                            <div className="flex items-center gap-2">
                                <Image className="h-6 w-full" url="/icons/master_card.svg" alt="MasterCard" />
                                <Image className="h-6 w-full" url="/icons/paypal.svg" alt="PayPal" />
                                <Image className="h-6 w-full" url="/icons/visa.svg" alt="Visa" />
                            </div>
                        </div>

                        {/* Right: Links */}
                        <div className="flex items-center gap-4 text-sm w-full md:w-auto justify-center md:justify-end">
                            <Link href="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors whitespace-nowrap">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-600 hover:text-purple-600 transition-colors whitespace-nowrap">
                                Terms of Use
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    );
}