"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from '@/componant/ui/Image';
import PageHeader from '@/componant/ui/PageHeader';
import { blogService, Blog, getBaseUrl } from '@/lib/blogService';

type BlogCard = {
  img: string;
  alt: string;
  title: string;
  date: string;
  comments: string;
  slug: string;
};

export default function BlogPage() {
  // State for blogs data
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const baseUrl = getBaseUrl();

  // Fetch blogs data when component mounts
  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        setLoading(true);
        // Fetch all blogs
        const response = await blogService.getAllBlogs(currentPage);
        
        if (response.status === 'success' && response.data) {
          setBlogs(response.data.data);
          setTotalPages(response.data.last_page);
          setTotalBlogs(response.data.total);
        } else {
          throw new Error(response.message || 'Failed to fetch blogs');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('❌ Error fetching blogs:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsData();
  }, [currentPage]);

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Convert API blog data to component format
  const convertBlogToCard = (blog: Blog) => ({
    img: `${baseUrl}/storage/uploads/blog/${blog.feature_image}`||`/blog/Steady-formations-blog-image-1.png`, //${baseUrl}/storage/uploads/blog/${blog.feature_image}
    alt: blog.title,
    title: blog.title,
    date: new Date(blog.created_at).toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }),
    comments: 'Comments', // Default, can be updated from API
    slug: blog.slug
  });

  // Get featured blog (first blog)
  const featuredBlog = blogs.length > 0 ? convertBlogToCard(blogs[0]) : null;
  
  // Get small cards (remaining blogs)
  const smallCards = blogs.slice(1, 4).map(convertBlogToCard);
  
  // Get latest blogs (first 3 blogs)
  const latestBlogs = blogs.slice(0, 3).map(convertBlogToCard);
  
  // Get business ideas (remaining blogs)
  const businessIdeas = blogs.slice(0, 6).map(convertBlogToCard);

  // Get main blog cards (featured + small cards)
  const mainBlogCards = featuredBlog ? [featuredBlog, ...smallCards] : smallCards;

  return <div>
    <PageHeader
      title="Resources and Insights"
      subTitle="The latest industry news, interviews, technologies, and resources."
      page="Blog"
    />
    <main className="w-full max-w-[390px] md:max-w-[1512px] mx-auto min-h-screen bg-white text-black">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-[#7856FC] text-[16px] leading-[24px] font-medium">Loading blogs...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-center py-8">
          <div className="text-red-500 text-[16px] leading-[24px] font-medium">Error: {error}</div>
        </div>
      )}

      {/* Blog Cards Section - New Design */}
      {/* Desktop/Tablet Only */}
      {!loading && !error && (
        <section className="w-full max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto mt-24 mb-[80px] grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0 hidden md:grid">
        {/* Featured Post (Left) */}
        {featuredBlog && (
          <Link href={`/blog/${featuredBlog.slug}`} className="bg-white rounded-xl p-0 flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
            <Image
              url={featuredBlog.img}
              alt={featuredBlog.alt}
              width={400}
              height={300}
              className="w-full h-[400px] object-cover rounded-xl mb-6"
            />
            <div className="flex items-center gap-6 mb-4 px-6">
              <span className="font-inter font-medium text-[16px] leading-[1.7] text-[#526061] flex items-center gap-2">
                <Image url="/blog/date-icon.svg" alt="Date" width={20} height={20} className="w-5 h-5" />
                {featuredBlog.date}
              </span>
              <span className="font-inter font-medium text-[16px] leading-[1.7] text-[#526061] flex items-center gap-2">
                <Image url="/blog/comment-icon.svg" alt="Comments" width={20} height={20} className="w-5 h-5" />
                {featuredBlog.comments}
              </span>
            </div>
            <h2 className="px-6 mb-6 font-cabinet font-bold text-[28px] leading-[42px] tracking-[-0.5px]">{featuredBlog.title}</h2>
            <div className="px-6 pb-6">
              <button
                className="px-6 py-2 border border-gray-300 rounded-full bg-transparent text-black font-medium hover:bg-gray-100 transition"
              >
                Learn More
              </button>
            </div>
          </Link>
        )}

        {/* Other Posts (Right) */}
        <div className="flex flex-col gap-6">
          {smallCards.map((card, idx) => (
            <Link
              key={card.alt}
              href={`/blog/${card.slug}`}
              className={`flex gap-4 items-center cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded-lg${idx < smallCards.length - 1 ? ' border-b-[1.54px] border-b-[#EFF5F5] pb-6' : ''}`}
            >
              <div style={{ width: '42%' }}>
                <Image
                  url={card.img}
                  alt={card.alt}
                  width={400}
                  height={300}
                  className="w-full h-[175px] object-cover rounded-lg"
                />
              </div>
              <div style={{ width: '58%' }}>
                <div className="flex items-center gap-6 mb-2">
                  <span className="font-inter font-medium text-[16px] leading-[1.7] text-[#526061] flex items-center gap-4">
                    <Image url="/blog/date-icon.svg" alt="Date" width={20} height={20} className="w-5 h-5" />
                    {card.date}
                  </span>
                  <span className="font-inter font-medium text-[16px] leading-[1.7] text-[#526061] flex items-center gap-2">
                    <Image url="/blog/comment-icon.svg" alt="Comments" width={20} height={20} className="w-5 h-5" />
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
      )}
      {/* Mobile Only Slider */}
      <section className="block md:hidden w-full max-w-[390px] mx-auto mt-8 mb-12 px-4">
        <MobileBlogSlider cards={mainBlogCards} />
      </section>

      {/* Latest Blogs Section */}
      <section className="w-full max-w-[980px] xl:max-w-[1293px] mx-auto mb-[96px] px-4 md:px-0">
        <h2 className="text-[30px] font-bold mb-6 ml-2">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {latestBlogs.map((card) => (
            <Link
              key={card.alt}
              href={`/blog/${card.slug}`}
              className="bg-white rounded-xl cursor-pointer"
            >
              <Image
                url={card.img}
                alt={card.alt}
                width={400}
                height={300}
                className="w-full h-[220px] object-cover rounded-xl mb-4"
              />
              <div className="flex items-center gap-6 mb-2">
                <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-3">
                  <Image url="/blog/date-icon.svg" alt="Date" width={20} height={20} className="w-5 h-5" />
                  {card.date}
                </span>
                <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-3">
                  <Image url="/blog/comment-icon.svg" alt="Comments" width={20} height={20} className="w-5 h-5" />
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
      <section className="w-full max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto mb-[60px] px-4 md:px-0 hidden md:block">
        <h2 className="text-[28px] font-bold mb-6 ml-2">Business Ideas and Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {businessIdeas.map((card, idx) => (
            <Link
              key={card.alt + idx}
              href={`/blog/${card.slug}`}
              className={`flex gap-6 items-center cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded-lg${idx < businessIdeas.length - 2 ? ' border-b-[1.54px] border-b-[#EFF5F5] pb-6' : ''}`}
            >
              <div style={{ width: '42%' }}>
                <Image
                  url={card.img}
                  alt={card.alt}
                  width={400}
                  height={300}
                  className="w-full h-[175px] object-cover rounded-xl"
                />
              </div>
              <div style={{ width: '58%' }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-2">
                    <Image url="/blog/date-icon.svg" alt="Date" width={20} height={20} className="w-5 h-5" />
                    {card.date}
                  </span>
                  <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-2">
                    <Image url="/blog/comment-icon.svg" alt="Comments" width={20} height={20} className="w-5 h-5" />
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
              <Image
                url={card.img}
                alt={card.alt}
                width={400}
                height={300}
                className="w-full h-[220px] object-cover rounded-xl mb-4"
              />
              <div className="flex items-center gap-6 mb-2">
                <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-3">
                  <Image url="/blog/date-icon.svg" alt="Date" width={20} height={20} className="w-5 h-5" />
                  {card.date}
                </span>
                <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-3">
                  <Image url="/blog/comment-icon.svg" alt="Comments" width={20} height={20} className="w-5 h-5" />
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
      {!loading && !error && totalPages > 1 && (
        <div className="w-full flex justify-center mb-[96px] px-4 md:px-0">
          <nav className="inline-flex items-center gap-1 rounded-md border border-[#EFF1F5] bg-white px-2 py-1 md:px-2 md:py-1">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center cursor-pointer gap-1 px-3 py-2 text-sm md:text-[16px] text-[#475467] font-medium rounded-md hover:bg-[#F9FAFB] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-lg mr-2 md:text-lg md:mr-2">&#8592;</span> Previous
            </button>
            {/* Mobile: short pagination, Desktop: full pagination */}
            <span className="flex md:hidden">
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((item) => (
                <button
                  key={`mobile-${item}`}
                  onClick={() => handlePageChange(item)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${item === currentPage ? 'bg-[#F9FAFB] text-[#344054]' : 'text-[#475467] hover:bg-[#F9FAFB]'} transition`}
                >
                  {item}
                </button>
              ))}
              {totalPages > 3 && <span className="px-3 py-2 text-sm text-[#475467]">...</span>}
            </span>
            <span className="hidden md:flex">
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                if (totalPages <= 7) return i + 1;
                if (currentPage <= 4) return i + 1;
                if (currentPage >= totalPages - 3) return totalPages - 6 + i;
                return currentPage - 3 + i;
              }).map((item, idx) => (
                <button
                  key={`desktop-${item}-${idx}`}
                  onClick={() => handlePageChange(item)}
                  className={`px-2 py-1 text-[16px] font-medium rounded-md ${item === currentPage ? 'bg-[#F9FAFB] text-[#344054]' : 'text-[#475467] hover:bg-[#F9FAFB]'} transition`}
                >
                  {item}
                </button>
              ))}
            </span>
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center cursor-pointer gap-1 px-3 py-2 text-sm md:text-[16px] text-[#475467] font-medium rounded-md hover:bg-[#F9FAFB] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <span className="text-lg ml-2 md:text-lg md:ml-2">&#8594;</span>
            </button>
          </nav>
        </div>
      )}

      <section className="w-full max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto mt-[96px] mb-[130px] md:px-0">
        <div className="flex flex-col md:flex-row gap-[21px]">
          {/* Left Column */}
          <div className="w-full md:w-[66%]">
            <div className="bg-[#6C3EF5] rounded-2xl px-8 md:px-10 py-10 md:py-16 h-full flex flex-col justify-between text-white relative overflow-hidden">
              <div className="w-full md:w-[80%] mb-9">
                <h2 className="font-inter font-bold text-[36px] leading-[44px] tracking-[-0.02em] mb-9">Get expert advice and a custom strategy session worth $799 at no cost.</h2>
                <button className="w-full md:w-auto bg-white text-black font-medium rounded-md px-6 py-3 mb-10 shadow hover:bg-[#f3f0ff] transition">Book A Free Call</button>
                <p className="font-inter font-bold text-[24px] leading-[32px] mb-5 md:mb-6">“Our sales growth has increased by 150% in last month after usign Dopler.”</p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  url="/blog/steady-formation-employee.png"
                  alt="Andrew Pearson"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
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
  </div>
}

function MobileBlogSlider({ cards }: { cards: BlogCard[] }) {
  const [current, setCurrent] = useState(0);
  const goTo = (idx: number) => setCurrent(idx);

  return (
    <div className="w-full">
      <Link href={`/blog/${cards[current]?.slug}`} className="block cursor-pointer">
        <Image
          url={cards[current]?.img}
          alt={cards[current]?.alt}
          width={400}
          height={300}
          className="w-full h-[220px] object-cover rounded-xl mb-4"
        />
        <div className="flex items-center gap-6 mb-2">
          <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-3">
            <Image url="/blog/date-icon.svg" alt="Date" width={20} height={20} className="w-5 h-5" />
            {cards[current]?.date}
          </span>
          <span className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-3">
            <Image url="/blog/comment-icon.svg" alt="Comments" width={20} height={20} className="w-5 h-5" />
            {cards[current]?.comments}
          </span>
        </div>
        <h3 className="font-inter font-bold text-[20px] leading-[30px] text-[#081717] mt-2 mb-6">
          {cards[current]?.title}
        </h3>
      </Link>
      <button className="w-full bg-white text-[#6C3EF5] font-medium rounded-md px-6 py-3 mb-10 shadow hover:bg-[#f3f0ff] transition">
        Book A Free Call
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
