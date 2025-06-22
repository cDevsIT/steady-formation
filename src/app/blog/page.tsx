"use client";
import React, { useState } from 'react';
import Link from 'next/link';

// Data for small cards
const smallCards = [
  {
    img: '/blog/Steady-formations-blog-image-2.png',
    alt: 'Blog 2',
    title: 'Never Worry About What to Do About Banking Again',
    date: '18 Jul 2023',
    comments: 'Comments',
    slug: 'never-worry-about-banking-again'
  },
  {
    img: '/blog/Steady-formations-blog-image-3.png',
    alt: 'Blog 3',
    title: 'Never Worry About What to Do About Banking Again',
    date: '18 Jul 2023',
    comments: 'Comments',
    slug: 'never-worry-about-banking-again-2'
  },
  {
    img: '/blog/Steady-formations-blog-image-4.png',
    alt: 'Blog 4',
    title: 'Never Worry About What to Do About Banking Again',
    date: '18 Jul 2023',
    comments: 'Comments',
    slug: 'never-worry-about-banking-again-3'
  },
];

// Data for latest blogs cards
const latestBlogs = [
  {
    img: '/blog/Steady-formations-blog-image-1.png',
    alt: 'Blog 1',
    title: 'Quick and Easy Flaky Pastry for Tasty Breakfast',
    date: '18 Jul 2023',
    comments: 'Comments',
    slug: 'quick-and-easy-flaky-pastry'
  },
  {
    img: '/blog/Steady-formations-blog-image-2.png',
    alt: 'Blog 2',
    title: 'Quick and Easy Flaky Pastry for Tasty Breakfast',
    date: '18 Jul 2023',
    comments: 'Comments',
    slug: 'quick-and-easy-flaky-pastry-2'
  },
  {
    img: '/blog/Steady-formations-blog-image-3.png',
    alt: 'Blog 3',
    title: 'Quick and Easy Flaky Pastry for Tasty Breakfast',
    date: '18 Jul 2023',
    comments: 'Comments',
    slug: 'quick-and-easy-flaky-pastry-3'
  },
];

// Data for business ideas and tips cards
const businessIdeas = [
  {
    img: '/blog/Steady-formations-blog-image-2.png',
    alt: 'Blog 2',
    title: 'Never Worry About What to Do About Banking Again',
    date: '18 Jul 2023',
    comments: 'Comments',
    slug: 'banking-tips-and-tricks'
  },
  {
    img: '/blog/Steady-formations-blog-image-2.png',
    alt: 'Blog 2',
    title: 'Never Worry About What to Do About Banking Again',
    date: '18 Jul 2023',
    comments: 'Comments',
    slug: 'banking-tips-and-tricks-2'
  },
  {
    img: '/blog/Steady-formations-blog-image-3.png',
    alt: 'Blog 3',
    title: 'Never Worry About What to Do About Banking Again',
    date: '18 Jul 2023',
    comments: 'Comments',
    slug: 'banking-tips-and-tricks-3'
  },
  {
    img: '/blog/Steady-formations-blog-image-3.png',
    alt: 'Blog 3',
    title: 'Never Worry About What to Do About Banking Again',
    date: '18 Jul 2023',
    comments: 'Comments',
    slug: 'banking-tips-and-tricks-4'
  },
  {
    img: '/blog/Steady-formations-blog-image-4.png',
    alt: 'Blog 4',
    title: 'Never Worry About What to Do About Banking Again',
    date: '18 Jul 2023',
    comments: 'Comments',
    slug: 'banking-tips-and-tricks-5'
  },
  {
    img: '/blog/Steady-formations-blog-image-4.png',
    alt: 'Blog 4',
    title: 'Never Worry About What to Do About Banking Again',
    date: '18 Jul 2023',
    comments: 'Comments',
    slug: 'banking-tips-and-tricks-6'
  },
];

// Data for all main blog cards (featured + small cards)
const mainBlogCards = [
  {
    img: '/blog/Steady-formations-blog-image-1.png',
    alt: 'Blog 1',
    title: 'Wise Spending Habits, 13 Tips for Maximizing Your Money.',
    date: '18 Jul 2023',
    comments: 'Comments',
    slug: 'wise-spending-habits-tips'
  },
  ...smallCards,
];

type BlogCard = {
  img: string;
  alt: string;
  title: string;
  date: string;
  comments: string;
  slug: string;
};

export default function BlogPage() {

  return (
    <main className="w-full max-w-[390px] md:max-w-[1512px] mx-auto min-h-screen bg-white text-black">

      {/* Banner Section */}
      <div className="w-full bg-[#F4F3FF] pt-[65px]">
        <div className="w-full max-w-[360px] md:max-w-[1280px] mx-auto py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[16px] md:text-[16px] font-semibold text-[#7856FC] mb-[16px] font-inter leading-[20px] md:leading-[24px] text-center">Blog</p>
          <h1 className="text-[30px] md:text-[48px] font-semibold mb-4 font-inter leading-[38px] md:leading-[60px] tracking-[-0.02em] text-center">
            Resources and Insights
          </h1>
          <p className="text-[16px] md:text-[20px] text-[#475467] font-normal font-inter leading-[24px] md:leading-[30px] text-center">
            The latest industry news, interviews, technologies, and resources.
          </p>
        </div>
      </div>

      {/* Blog Cards Section - New Design */}
      {/* Desktop/Tablet Only */}
      <section className="w-full max-w-[1280px] mx-auto mt-24 mb-[80px] grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0 hidden md:grid">
        {/* Featured Post (Left) */}
        <Link href={`/blog/${mainBlogCards[0].slug}`} className="bg-white rounded-xl p-0 flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
          <img
            src="/blog/Steady-formations-blog-image-1.png"
            alt="Featured Blog"
            className="w-full h-[400px] object-cover rounded-xl mb-6"
          />
          <div className="flex items-center gap-6 mb-4 px-6">
            <span className="font-inter font-medium text-[16px] leading-[1.7] text-[#526061] flex items-center gap-2">
              <img src="/blog/date-icon.svg" alt="Date" className="w-5 h-5" />
              18 Jul 2023
            </span>
            <span className="font-inter font-medium text-[16px] leading-[1.7] text-[#526061] flex items-center gap-2">
              <img src="/blog/comment-icon.svg" alt="Comments" className="w-5 h-5" />
              Comments
            </span>
          </div>
          <h2 className="px-6 mb-6 font-cabinet font-bold text-[28px] leading-[42px] tracking-[-0.5px]">Wise Spending Habits, 13 Tips for Maximizing Your Money.</h2>
          <div className="px-6 pb-6">
            <button
              className="w-full md:w-auto bg-white text-[#6C3EF5] font-medium rounded-md px-6 py-3 mb-10 shadow hover:bg-[#f3f0ff] transition"
            >
              Book A Free Call
            </button>
          </div>
        </Link>

        {/* Other Posts (Right) */}
        <div className="flex flex-col gap-6">
          {smallCards.map((card, idx) => (
            <Link
              key={card.alt}
              href={`/blog/${card.slug}`}
              className={`flex gap-4 items-center cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded-lg${idx < smallCards.length - 1 ? ' border-b-[1.54px] border-b-[#EFF5F5] pb-6' : ''}`}
            >
              <div style={{ width: '42%' }}>
                <img
                  src={card.img}
                  alt={card.alt}
                  className="w-full h-[175px] object-cover rounded-lg"
                />
              </div>
              <div style={{ width: '58%' }}>
                <div className="flex items-center gap-6 mb-2">
                  <span className="font-inter font-medium text-[16px] leading-[1.7] text-[#526061] flex items-center gap-4">
                    <img src="/blog/date-icon.svg" alt="Date" className="w-5 h-5" />
                    {card.date}
                  </span>
                  <span className="font-inter font-medium text-[16px] leading-[1.7] text-[#526061] flex items-center gap-2">
                    <img src="/blog/comment-icon.svg" alt="Comments" className="w-5 h-5" />
                    {card.comments}
                  </span>
                </div>
                <h3 className="font-cabinet font-bold text-[24px] leading-[36px] tracking-[-0.01em] text-[#081717]">
                  {card.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mobile Only Slider */}
      <section className="block md:hidden w-full max-w-[390px] mx-auto mt-8 mb-12 px-4">
        <MobileBlogSlider cards={mainBlogCards} />
      </section>

      {/* Latest Blogs Section */}
      <section className="w-full max-w-[1280px] mx-auto mb-[96px] px-4 md:px-0">
        <h2 className="text-[30px] font-bold mb-6 ml-2">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestBlogs.map((card) => (
            <Link
              key={card.alt}
              href={`/blog/${card.slug}`}
              className="bg-white rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <img
                src={card.img}
                alt={card.alt}
                className="w-full h-[220px] object-cover rounded-xl mb-4"
              />
              <div className="flex items-center gap-6 mb-2">
                <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-3">
                  <img src="/blog/date-icon.svg" alt="Date" className="w-5 h-5" />
                  {card.date}
                </span>
                <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-3">
                  <img src="/blog/comment-icon.svg" alt="Comments" className="w-5 h-5" />
                  {card.comments}
                </span>
              </div>
              <h3 className="font-inter font-bold text-[20px] leading-[30px] text-[#081717] mt-2">
                {card.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Business Ideas and Tips Section */}

      {/* Desktop/Tablet Only */}
      <section className="w-full max-w-[1280px] mx-auto mb-[60px] px-4 md:px-0 hidden md:block">
        <h2 className="text-[28px] font-bold mb-6 ml-2">Business Ideas and Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {businessIdeas.map((card, idx) => (
            <Link
              key={card.alt + idx}
              href={`/blog/${card.slug}`}
              className={`flex gap-6 items-center cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded-lg${idx < businessIdeas.length - 2 ? ' border-b-[1.54px] border-b-[#EFF5F5] pb-6' : ''}`}
            >
              <div style={{ width: '42%' }}>
                <img
                  src={card.img}
                  alt={card.alt}
                  className="w-full h-[175px] object-cover rounded-xl"
                />
              </div>
              <div style={{ width: '58%' }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-2">
                    <img src="/blog/date-icon.svg" alt="Date" className="w-5 h-5" />
                    {card.date}
                  </span>
                  <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-2">
                    <img src="/blog/comment-icon.svg" alt="Comments" className="w-5 h-5" />
                    {card.comments}
                  </span>
                </div>
                <h3 className="font-inter font-bold text-[20px] leading-[30px] text-[#081717]">
                  {card.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mobile Only: Business Ideas and Tips as Cards */}
      <section className="block md:hidden w-full max-w-[390px] mx-auto mb-[60px] px-4">
        <h2 className="text-[28px] font-bold mb-6 ml-2">Business Ideas and Tips</h2>
        <div className="grid grid-cols-1 gap-8">
          {businessIdeas.map((card, idx) => (
            <Link
              key={card.alt + idx}
              href={`/blog/${card.slug}`}
              className="bg-white rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <img
                src={card.img}
                alt={card.alt}
                className="w-full h-[220px] object-cover rounded-xl mb-4"
              />
              <div className="flex items-center gap-6 mb-2">
                <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-3">
                  <img src="/blog/date-icon.svg" alt="Date" className="w-5 h-5" />
                  {card.date}
                </span>
                <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-3">
                  <img src="/blog/comment-icon.svg" alt="Comments" className="w-5 h-5" />
                  {card.comments}
                </span>
              </div>
              <h3 className="font-inter font-bold text-[20px] leading-[30px] text-[#081717] mt-2">
                {card.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Pagination Section */}
      <div className="w-full flex justify-center mb-[96px] px-4 md:px-0">
        <nav className="inline-flex items-center gap-1 rounded-md border border-[#EFF1F5] bg-white px-2 py-1 md:px-2 md:py-1">
          <button className="flex items-center cursor-pointer gap-1 px-3 py-2 text-sm md:text-[16px] text-[#475467] font-medium rounded-md hover:bg-[#F9FAFB] transition">
            <span className="text-lg mr-2 md:text-lg md:mr-2">&#8592;</span> Previous
          </button>
          {/* Mobile: short pagination, Desktop: full pagination */}
          <span className="flex md:hidden">
            {[1, 2, '...'].map((item, idx) => (
              <button
                key={`mobile-${item}-${idx}`}
                className={`px-3 py-2 text-sm font-medium rounded-md ${item === 1 ? 'bg-[#F9FAFB] text-[#344054]' : 'text-[#475467] hover:bg-[#F9FAFB]'} transition`}
                disabled={item === '...'}
              >
                {item}
              </button>
            ))}
          </span>
          <span className="hidden md:flex">
            {[1, 2, 3, '...', 8, 9, 10].map((item, idx) => (
              <button
                key={`desktop-${item}-${idx}`}
                className={`px-2 py-1 text-[16px] font-medium rounded-md ${item === 1 ? 'bg-[#F9FAFB] text-[#344054]' : 'text-[#475467] hover:bg-[#F9FAFB]'} transition`}
                disabled={item === '...'}
              >
                {item}
              </button>
            ))}
          </span>
          <button className="flex items-center cursor-pointer gap-1 px-3 py-2 text-sm md:text-[16px] text-[#475467] font-medium rounded-md hover:bg-[#F9FAFB] transition">
            Next <span className="text-lg ml-2 md:text-lg md:ml-2">&#8594;</span>
          </button>
        </nav>
      </div>

      <section className="w-full max-w-[1280px] mx-auto mt-[96px] px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-[21px]">
          {/* Left Column */}
          <div className="w-full md:w-[66%]">
            <div className="bg-[#6C3EF5] rounded-2xl px-8 md:px-10 py-10 md:py-16 h-full flex flex-col justify-between text-white relative overflow-hidden">
              <div className="w-full md:w-[80%] mb-9">
                <h2 className="font-inter font-bold text-[36px] leading-[44px] tracking-[-0.02em] mb-9">Get expert advice and a custom strategy session worth $799 at no cost.</h2>
                <button className="w-full md:w-auto bg-white text-[#6C3EF5] font-medium rounded-md px-6 py-3 mb-10 shadow hover:bg-[#f3f0ff] transition">Book A Free Call</button>
                <p className="font-inter font-bold text-[24px] leading-[32px] mb-5 md:mb-6">“Our sales growth has increased by 150% in last month after usign Dopler.”</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="/blog/steady-formation-employee.png" alt="Andrew Pearson" className="w-12 h-12 rounded-full object-cover border-2 border-white" />
                <div>
                  <div className="font-bold text-white">Andrew Pearson</div>
                  <div className="text-white/80 text-sm">Founder, Company</div>
                </div>
              </div>
              {/* Decorative SVG or shape can be added here if needed */}
            </div>
          </div>
          {/* Right Column */}
          <div className="w-full md:w-[32%] mt-6 md:mt-0">
            <div className="bg-[#F9FAFB] rounded-2xl p-8 h-full flex flex-col shadow">
              <h3 className="font-inter font-bold text-[30px] leading-[38px] mb-[30px]">Join our Steady Formation community!</h3>
              <p className="font-inter font-normal text-[14px] leading-[20px] mb-[45px] text-[#42526B]">Get early access to new features, software tips, and the latest trends in development — straight to your inbox.</p>
              <form className="flex flex-col gap-4">
                <input type="text" placeholder="Your Name" className="bg-white rounded-md px-4 py-3 text-[16px] focus:outline-none focus:border-[#6C3EF5] border-[1.46px] border-[#E4E7EC]" />
                <input type="email" placeholder="Email" className="bg-white rounded-md px-4 py-3 text-[16px] focus:outline-none focus:border-[#6C3EF5] border-[1.46px] border-[#E4E7EC]" />
                <button type="submit" className="bg-[#6C3EF5] text-white font-semibold text-[16px] leading-[24px] rounded-md px-8 py-3 mt-2 hover:bg-[#532bcf] transition font-inter">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MobileBlogSlider({ cards }: { cards: BlogCard[] }) {
  const [current, setCurrent] = useState(0);
  const goTo = (idx: number) => setCurrent(idx);

  return (
    <div className="w-full">
      <Link href={`/blog/${cards[current].slug}`} className="block cursor-pointer">
        <img
          src={cards[current].img}
          alt={cards[current].alt}
          className="w-full h-[220px] object-cover rounded-xl mb-4"
        />
        <div className="flex items-center gap-6 mb-2">
          <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-3">
            <img src="/blog/date-icon.svg" alt="Date" className="w-5 h-5" />
            {cards[current].date}
          </span>
          <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-3">
            <img src="/blog/comment-icon.svg" alt="Comments" className="w-5 h-5" />
            {cards[current].comments}
          </span>
        </div>
        <h3 className="font-inter font-bold text-[20px] leading-[30px] text-[#081717] mt-2 mb-6">
          {cards[current].title}
        </h3>
      </Link>
      <button className="w-full border border-[#E4E7EC] rounded-full py-3 font-inter font-semibold text-[16px] leading-[24px] text-[#081717] mb-6">
        Learn More
      </button>
      <div className="flex justify-center gap-2">
        {cards.map((_, idx: number) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full ${idx === current ? 'bg-[#6C3EF5]' : 'bg-[#E4E7EC]'} transition`}
            style={{ outline: 'none', border: 'none' }}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
