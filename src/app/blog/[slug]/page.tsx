import React from 'react';
import { notFound } from 'next/navigation';
import LaunchCompanyPopup from "@/componant/shared/LaunchCompanyPopup";
import Image from '@/componant/ui/Image';
import { blogService, Blog, getBaseUrl } from '@/lib/blogService';
import { Metadata } from 'next';
import TableOfContents from './TableOfContents';

// Utility function to extract H2 tags from HTML content (server-side)
function extractH2Tags(htmlContent: string): Array<{ title: string; id: string; link: string }> {
  if (!htmlContent) return [];
  
  // Use regex to extract H2 tags since DOMParser is not available on server
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
  const matches = htmlContent.match(h2Regex);
  
  if (!matches) return [];
  
  return matches.map((match, index) => {
    // Extract text content from H2 tag
    const textContent = match.replace(/<[^>]*>/g, '').trim();
    const id = `section-${index + 1}`;
    return {
      title: textContent,
      id,
      link: `#${id}`
    };
  });
}

// Utility function to add IDs to H2 tags in HTML content (server-side)
function addIdsToH2Tags(htmlContent: string): string {
  if (!htmlContent) return '';
  
  let index = 1;
  return htmlContent.replace(/<h2([^>]*)>/gi, (match, attributes) => {
    const id = `section-${index}`;
    index++;
    return `<h2${attributes} id="${id}">`;
  });
}

function slugToTitle(slug: string): string {
  if (!slug) return '';
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c: string) => c.toUpperCase());
}




// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await blogService.getBlogBySlug(slug);
    
    if (response.status === 'success' && response.data) {
      const blog = response.data;
      return {
        title: blog.title,
        description: blog.description,
        openGraph: {
          title: blog.title,
          description: blog.description,
          type: 'article',
          publishedTime: blog.created_at,
          authors: [blog.author.name],
        },
        twitter: {
          card: 'summary_large_image',
          title: blog.title,
          description: blog.description,
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  return {
    title: 'Blog Post',
    description: 'Read our latest blog post',
  };
}

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const blogTitle = slugToTitle(slug);
  const baseUrl = getBaseUrl();
  
  // Fetch blog data at request time (SSR)
  let blog: Blog | null = null;
  let error: string | null = null;
  
  try {
    const response = await blogService.getBlogBySlug(slug);
    
    if (response.status === 'success' && response.data) {
      blog = response.data;
    } else {
      error = response.message || 'Failed to fetch blog';
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('❌ Error fetching blog:', error);
  }

  // Fetch latest blogs data at request time (SSR)
  let latestBlogs: Blog[] = [];
  let latestBlogsError: string | null = null;

  try {
    const latestResponse = await blogService.getAllBlogs(1);
    
    if (latestResponse.status === 'success' && latestResponse.data) {
      latestBlogs = latestResponse.data.data.slice(0, 6); // Get first 6 blogs
    } else {
      latestBlogsError = latestResponse.message || 'Failed to fetch latest blogs';
    }
  } catch (err) {
    latestBlogsError = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('❌ Error fetching latest blogs:', latestBlogsError);
  }
  
  // If blog not found, return 404
  if (!blog && !error) {
    notFound();
  }

  // Generate table of contents from blog content
  const tableOfContents = blog ? extractH2Tags(blog.content) : [];
  
  // Add IDs to H2 tags in blog content
  const processedContent = blog ? addIdsToH2Tags(blog.content) : '';


  return (
    <div className="w-full min-h-screen bg-white pt-[70px]">
      <div className='hidden'>
        <LaunchCompanyPopup />
      </div>
      <div className="max-w-[980px] px-5 lg:px-0 lg:max-w-[1100px] xl:max-w-[1280px] mx-auto py-8 flex flex-col md:flex-row gap-8">
        {/* Table of Content (Left) - 21.6% */}
        <TableOfContents items={tableOfContents} blogTitle={blog?.title || blogTitle} />

        {/* Main Blog Content (Center) - 55% */}
        <main className="w-full md:w-[55%]">
          {error ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-red-500 text-[16px] leading-[24px] font-medium">Error: {error}</div>
            </div>
          ) : blog ? (
            <>
              <p className="text-[#7856FC] text-[16px] leading-[24px] font-medium mb-3">
                Published {new Date(blog.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
              <h1 className="font-inter text-[30px] leading-[38px] md:text-[48px] md:leading-[60px] font-semibold tracking-[-0.02em] text-black mb-6">
                {blog.title}
              </h1>
                <Image
                  url={`${baseUrl}/storage/uploads/blog/${blog.feature_image}`}
                  alt={blog.feature_image}
                  width={400}
                  height={300}
                  className="w-full h-[400px] object-cover rounded-xl mb-6"
                />
              <p className="font-inter text-[16px] leading-[24px] md:text-[20px] md:leading-[30px] font-normal text-[#475467] mb-6">
                {blog.description}
              </p>
              <div className="blog-content font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-6" 
                   dangerouslySetInnerHTML={{ __html: processedContent }} />
            </>
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="text-[#475467] text-[16px] leading-[24px] font-medium">No blog found</div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex justify-between items-center gap-12 mt-8">
            <div className="flex flex-col items-start w-1/2">
              <a href="#" className="flex items-center gap-3 border border-[#D0D5DD] rounded-lg py-2 px-4 text-[#000000] mb-2 hover:border-[#7856FC] hover:text-[#7856FC] transition-colors">
                <Image url="/blog-details/arrow-left-icon.svg" alt="Previous" className="w-5 h-5" />
                <span className="font-inter font-semibold text-[14px] leading-[20px] tracking-[-0.017em]">Previous</span>
              </a>
              <p className="text-[14px] leading-[20px] font-medium text-[#101828] hover:text-[#7856FC] transition-colors cursor-pointer">Wise Spending Habits, 13 Tips for Maximizing Your Money.</p>
            </div>
            <div className="w-[1px] h-[64px] bg-[#D0D5DD]"></div>
            <div className="flex flex-col items-end w-1/2">
              <a href="#" className="flex items-center gap-3 border border-[#D0D5DD] rounded-lg py-2 px-4 text-[#000000] mb-2 hover:border-[#7856FC] hover:text-[#7856FC] transition-colors">
                <span className="font-inter font-semibold text-[14px] leading-[20px] tracking-[-0.017em]">Next</span>
                <Image url="/blog-details/arrow-right-icon.svg" alt="Next" className="w-5 h-5" />
              </a>
              <p className="text-[14px] leading-[20px] font-medium text-[#101828] text-right hover:text-[#7856FC] transition-colors cursor-pointer">Wise Spending Habits, 13 Tips for Maximizing Your Money.</p>
            </div>
          </div>

        </main>

        {/* Sidebar (Right) - 18.5% */}
        <aside className="w-full md:w-[18.9%] flex flex-col gap-6">
          <div className="flex flex-row md:flex-col gap-4 md:gap-6">
            <div className="bg-[#EBE8FF] rounded-xl p-6 flex flex-col flex-1 md:flex-none">
              <div className="flex -space-x-3 mb-4">
                <Image url="/blog-details/advisor-icon-1.png" alt="Advisor 1" className="w-14 h-14 rounded-full border-2 border-white" />
                <Image url="/blog-details/advisor-icon-2.png" alt="Advisor 2" className="w-14 h-14 rounded-full border-2 border-white" />
                <Image url="/blog-details/advisor-icon-3.png" alt="Advisor 3" className="w-14 h-14 rounded-full border-2 border-white" />
              </div>
              <p className="font-inter font-semibold text-[20px] leading-[30px] text-black mb-4">Still unsure which structure fits your business best?</p>
              <button className="bg-[#7856FC] text-white rounded-lg px-3 py-2 font-medium font-inter text-[16px] leading-[24px]">Talk Business Advisor</button>
            </div>

            <div className="bg-white rounded-xl p-6 flex flex-col items-center border border-[#E4E7EC] w-auto md:w-full">
              <span className="font-inter font-semibold text-[20px] leading-[28px] text-black mb-6 w-full text-left">Share</span>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                <Image url="/blog-details/instagram-active-icon.svg" alt="Instagram" className="w-6 h-6" />
                <Image url="/blog-details/telegram-icon.svg" alt="Telegram" className="w-6 h-6" />
                <Image url="/blog-details/tiktok-icon.svg" alt="TikTok" className="w-6 h-6" />
                <Image url="/blog-details/youtube-icon.svg" alt="YouTube" className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-[#240D68] rounded-xl pt-6 px-6 pb-0 flex flex-col items-center text-center">
            <span className="font-inter font-semibold text-[30px] leading-[38px] md:text-[20px] md:leading-[28px] text-white mb-5 w-full text-center md:text-left">Launch Your U.S. Company</span>
            <button className="bg-[#7856FC] text-white rounded-lg px-3 py-2 font-medium font-inter mb-7 text-[16px] leading-[24px] w-full">Start Now</button>
            <Image url="/blog-details/launch-company-US-sidebar-image.png" alt="Launch US Company" className="w-auto md:w-[160px] h-[319px] md:h-auto mx-auto mb-0" />
          </div>
        </aside>
      </div>

      {/* New Section Outside 3-Column Layout */}
      <section className="w-full max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto mt-24 md:mt-28 mb-36 px-4 md:px-0">
        <h2 className="font-inter font-semibold text-[36px] leading-[44px] mb-[36px] tracking-[-0.02em] text-black">Read our latest posted blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8">
          {latestBlogsError ? (
            <div className="col-span-2 text-center text-red-500 py-8">
              <p>Unable to load latest blogs. Please try again later.</p>
            </div>
          ) : latestBlogs.length > 0 ? (
            latestBlogs.map((blog, idx) => (
              <div key={blog.id} className="mb-6">
                <div className="flex items-center gap-6 mb-2">
                  <span className="flex items-center gap-2 font-inter font-medium text-[16px] leading-[27.2px] tracking-normal text-[#526061]">
                    <Image url="/blog/date-icon.svg" alt="Date" className="w-4 h-4" />
                    {new Date(blog.created_at).toLocaleDateString('en-US', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-2 font-inter font-medium text-[16px] leading-[27.2px] tracking-normal text-[#526061]">
                    <Image url="/blog/comment-icon.svg" alt="Comments" className="w-4 h-4" />
                    Comments
                  </span>
                </div>
                <div className="font-inter font-semibold text-[18px] leading-[28px] mb-[18px] text-black">{blog.title}</div>
                <div className="font-inter font-normal text-[18px] leading-[28px] mb-[18px] text-[#475467]">{blog.description}</div>
                <div className="border-b border-[#EAECF0] mt-4" />
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500 py-8">
              <p>No blog posts available.</p>
            </div>
          )}
        </div>
      </section>

      <section className="w-full max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto mt-[96px] px-4 md:px-0 pb-36">
        <div className="flex flex-col md:flex-row gap-[21px]">
          {/* Left Column */}
          <div className="w-full md:w-[66%]">
            <div className="bg-[#6C3EF5] rounded-2xl px-8 md:px-10 py-10 md:py-16 h-full flex flex-col justify-between text-white relative overflow-hidden">
              <div className="w-full md:w-[80%] mb-9">
                <h2 className="font-inter font-bold text-[36px] leading-[44px] tracking-[-0.02em] mb-9">Get expert advice and a custom strategy session worth $799 at no cost.</h2>
                <button className="w-full md:w-auto bg-white text-[#6C3EF5] font-medium rounded-md px-6 py-3 mb-10 shadow hover:bg-[#f3f0ff] transition">Book A Free Call</button>
                <p className="font-inter font-bold text-[24px] leading-[32px] mb-5 md:mb-6">&quot;Our sales growth has increased by 150% in last month after usign Dopler.&quot;</p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  url="/blog/steady-formation-employee.png"
                  alt="Andrew Pearson"
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
              <h3 className="font-inter font-bold text-black text-[30px] leading-[38px] mb-[30px]">Join our Steady Formation community!</h3>
              <p className="font-inter font-normal text-[14px] leading-[20px] mb-[45px] text-[#42526B]">Get early access to new features, software tips, and the latest trends in development — straight to your inbox.</p>
              <form className="flex flex-col gap-4">
                <input type="text" placeholder="Your Name" className="bg-white rounded-md px-4 py-3 text-[16px] focus:outline-none focus:border-[#6C3EF5] border-[1.46px] border-[#E4E7EC] placeholder-[#475467]" />
                <input type="email" placeholder="Email" className="bg-white rounded-md px-4 py-3 text-[16px] focus:outline-none focus:border-[#6C3EF5] border-[1.46px] border-[#E4E7EC] placeholder-[#475467]" />
                <button type="submit" className="bg-[#6C3EF5] text-white font-semibold text-[16px] leading-[24px] rounded-md px-8 py-3 mt-2 hover:bg-[#532bcf] transition font-inter">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div >
  );
} 