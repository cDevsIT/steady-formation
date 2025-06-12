export default function ContactUs() {
    return (
        <main className="w-full max-w-[390px] md:max-w-[1512px] mx-auto min-h-screen bg-white text-black">
            {/* Banner Section */}
            <div className="w-full bg-[#F4F3FF] pt-[65px]">
                <div className="w-full max-w-[360px] md:max-w-[1280px] mx-auto py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-[14px] md:text-[16px] font-semibold text-[#7856FC] mb-[16px] font-inter leading-[20px] md:leading-[24px] text-center">Contact Us</p>
                    <h1 className="text-[36px] md:text-[48px] font-semibold mb-4 font-inter leading-[44px] md:leading-[60px] tracking-[-0.02em] text-center">
                        Get in Touch
                    </h1>
                    <p className="text-[16px] md:text-[20px] text-[#475467] font-normal font-inter leading-[24px] md:leading-[30px] text-center">
                        Contact our expert support team. Ask query to our team and get solutions 24/7 from anywhere.
                    </p>
                </div>
            </div>

            <div className="w-full max-w-[360px] md:max-w-[1280px] mx-auto py-8 md:py-12 lg:py-16 px-0 sm:px-6 lg:px-8">
                <h2 className="text-[30px] md:text-[40px] lg:text-[48px] font-semibold text-left mt-10 md:mt-16 lg:mt-32 w-full md:w-3/4 lg:w-2/4 leading-[38px] md:leading-[52px] lg:leading-[60px] font-inter lg:mb-6">
                    Our friendly team would love to hear from you.
                </h2>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mt-6">
                    {/* Left side - Contact Form */}
                    <div className="w-full lg:w-1/2">
                        <form className="space-y-6">
                            {/* Name Fields Row */}
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="w-full sm:w-1/2">
                                    <label htmlFor="firstName" className="block text-[14px] font-medium text-[#344054] mb-2 font-inter leading-[20px]">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="First name"
                                    />
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <label htmlFor="lastName" className="block text-[14px] font-medium text-[#344054] mb-2 font-inter leading-[20px]">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Last name"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="mt-6">
                                <label htmlFor="email" className="block text-[14px] font-medium text-[#344054] mb-2 font-inter leading-[20px]">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="you@company.com"
                                />
                            </div>

                            {/* Phone Field */}
                            <div className="mt-6">
                                <label htmlFor="phone" className="block text-[14px] font-medium text-[#344054] mb-2 font-inter leading-[20px]">
                                    Phone Number
                                </label>
                                <div className="relative flex items-center">
                                    <select
                                        id="countryCode"
                                        name="countryCode"
                                        className="absolute left-0 w-[90px] pl-4 pr-8 py-3 bg-transparent border-0 appearance-none z-10 focus:ring-0"
                                    >
                                        <option value="+1">US</option>
                                        <option value="+93">AF</option>
                                        <option value="+355">AL</option>
                                        <option value="+213">DZ</option>
                                        <option value="+376">AD</option>
                                        <option value="+244">AO</option>
                                        <option value="+672">AQ</option>
                                        <option value="+54">AR</option>
                                        <option value="+374">AM</option>
                                        <option value="+61">AU</option>
                                        <option value="+880">BD</option>
                                        <option value="+975">BT</option>
                                        <option value="+673">BN</option>
                                        <option value="+855">KH</option>
                                        <option value="+86">CN</option>
                                        <option value="+852">HK</option>
                                        <option value="+91">IN</option>
                                        <option value="+62">ID</option>
                                        <option value="+81">JP</option>
                                        <option value="+82">KR</option>
                                        <option value="+856">LA</option>
                                        <option value="+60">MY</option>
                                        <option value="+960">MV</option>
                                        <option value="+976">MN</option>
                                        <option value="+95">MM</option>
                                        <option value="+977">NP</option>
                                        <option value="+64">NZ</option>
                                        <option value="+92">PK</option>
                                        <option value="+63">PH</option>
                                        <option value="+65">SG</option>
                                        <option value="+94">LK</option>
                                        <option value="+886">TW</option>
                                        <option value="+66">TH</option>
                                        <option value="+670">TL</option>
                                        <option value="+84">VN</option>
                                    </select>
                                    <div className="pointer-events-none absolute left-[45px] top-1/2 -translate-y-1/2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full pl-24 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            {/* Subject Field */}
                            <div className="mt-6">
                                <label htmlFor="subject" className="block text-[14px] font-medium text-[#344054] mb-2 font-inter leading-[20px]">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Subject"
                                />
                            </div>

                            {/* Message Field */}
                            <div className="mt-6">
                                <label htmlFor="message" className="block text-[14px] font-medium text-[#344054] mb-2 font-inter leading-[20px]">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    className="w-full px-4 py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Leave us a message..."
                                ></textarea>
                            </div>

                            {/* Privacy Policy Checkbox */}
                            <div className="mt-6 flex items-start gap-3">
                                <div className="flex items-center h-6">
                                    <input
                                        id="privacy"
                                        name="privacy"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </div>
                                <label htmlFor="privacy" className="text-[14px] text-[#344054] font-inter leading-[20px]">
                                    You agree to our friendly <span className="underline">privacy policy</span>.
                                </label>
                            </div>

                            {/* Send Message Button */}
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full bg-[#7856FC] text-white py-3 px-4 rounded-lg hover:bg-[#6745e3] focus:outline-none focus:ring-2 focus:ring-[#7856FC] focus:ring-offset-2 transition-colors"
                                >
                                    Send message
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right side - Image */}
                    <div className="w-full lg:w-1/2 lg:flex lg:items-stretch">
                        <div className="w-full h-full">
                            <img
                                src="/steady-formations-contact-page.png"
                                alt="Contact Us"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Cards Section */}
            <div className="w-full max-w-[360px] md:max-w-[1280px] mx-auto py-8 md:py-12 px-0 sm:px-6 lg:px-8 mt-[120px] mb-[150px]">
                <h2 className="text-[38px] md:text-[48px] font-semibold text-center mb-[10px] font-inter leading-[38px] md:leading-[60px] text-[#000000]">
                    We'd love to hear from you
                </h2>
                <h3 className="text-[16px] md:text-[20px] font-normal text-center mb-[32px] font-inter leading-[24px] md:leading-[30px] text-[#475467]">
                    Our friendly team is always here to chat.
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Chat to sales Card */}
                    <div className="p-6 rounded-lg border border-gray-200 flex flex-col items-start text-left">
                        <div className="mb-8">
                            <img
                                src="/steady-formation-smile-icon.svg"
                                alt="Support icon"
                                width={48}
                                height={48}
                            />
                        </div>
                        <h4 className="text-[20px] font-semibold mb-[20px] font-inter leading-[30px]">Chat to sales</h4>
                        <p className="text-[16px] font-normal text-[#475467] mb-[16px] font-inter leading-[24px]">Speak to our friendly team.</p>
                        <a href="mailto:info@steadyformation.com" className="text-[16px] text-[#7856FC] font-semibold font-inter leading-[24px]">
                            info@steadyformation.com
                        </a>
                    </div>

                    {/* Chat to support Card */}
                    <div className="p-6 rounded-lg border border-gray-200 flex flex-col items-start text-left">
                        <div className="mb-8">
                            <img
                                src="/steady-formation-chat-icon.svg"
                                alt="Chat icon"
                                width={48}
                                height={48}
                            />
                        </div>
                        <h4 className="text-[20px] font-semibold mb-[20px] font-inter leading-[30px]">Chat to support</h4>
                        <p className="text-[16px] font-normal text-[#475467] mb-[16px] font-inter leading-[24px]">We're here to help.</p>
                        <a href="mailto:info@steadyformation.com" className="text-[16px] text-[#7856FC] font-semibold font-inter leading-[24px]">
                            info@steadyformation.com
                        </a>
                    </div>

                    {/* Visit us Card */}
                    <div className="p-6 rounded-lg border border-gray-200 flex flex-col items-start text-left">
                        <div className="mb-8">
                            <img
                                src="/steady-formation-visit-us-icon.svg"
                                alt="Location icon"
                                width={48}
                                height={48}
                            />
                        </div>
                        <h4 className="text-[20px] font-semibold mb-[20px] font-inter leading-[30px]">Visit us</h4>
                        <p className="text-[16px] font-normal text-[#475467] mb-[16px] font-inter leading-[24px]">Visit our office HQ.</p>
                        <p className="text-[16px] text-[#7856FC] font-semibold font-inter leading-[24px]">
                            100 Smith Street<br />
                            Collingwood VIC 3066 AU
                        </p>
                    </div>

                    {/* Call us Card */}
                    <div className="p-6 rounded-lg border border-gray-200 flex flex-col items-start text-left">
                        <div className="mb-8">
                            <img
                                src="/steady-formation-phone-icon.svg"
                                alt="Phone icon"
                                width={48}
                                height={48}
                            />
                        </div>
                        <h4 className="text-[20px] font-semibold mb-[20px] font-inter leading-[30px]">Call us</h4>
                        <p className="text-[16px] font-normal text-[#475467] mb-[16px] font-inter leading-[24px]">Mon-Fri from 8am to 5pm.</p>
                        <a href="tel:+1555000-0000" className="text-[16px] text-[#7856FC] font-semibold font-inter leading-[24px]">
                            +1 (555) 000-0000
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
} 