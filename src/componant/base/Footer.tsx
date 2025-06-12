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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
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
                                        className="w-8 h-8 bg-gray-200 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors duration-200 group"
                                        aria-label={social.name}
                                    >
                                        <Image className='h-4 w-4' url={Icon} alt={social.name} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                    <div className="space-y-4">
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
                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-500">
                            © {currentYear} All Right Reserved by Steady Formation
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-sm text-gray-600">We Accept</div>
                            <div className="flex items-center gap-2">
                                <Image className='h-6' url='/icons/master_card.svg' alt='MasterCard' />
                                <Image className='h-6' url='/icons/paypal.svg' alt='MasterCard' />
                                <Image className='h-6' url='/icons/visa.svg' alt='MasterCard' />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                            <Link href="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-600 hover:text-purple-600 transition-colors">
                                Terms of Use
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}