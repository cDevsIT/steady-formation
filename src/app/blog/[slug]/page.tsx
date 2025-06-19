"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import LaunchCompanyPopup from "@/componant/shared/LaunchCompanyPopup";

function slugToTitle(slug: string): string {
  if (!slug) return '';
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c: string) => c.toUpperCase());
}

// This will come from API later
const tableOfContents = [
  {
    title: "Introduction",
    link: "#section1",
    isActive: true
  },
  {
    title: "Why Do You Need a B2B Website Design Agency for Your Business?",
    link: "#section2",
    isActive: false
  },
  {
    title: "7 Best B2B Website Design Agencies",
    link: "#section3",
    isActive: false
  },
  {
    title: "How to Choose the Best B2B Website Design Agency?",
    link: "#section4",
    isActive: false
  }
];

const latestBlogsData = [
  {
    id: 1,
    date: '18 Jul 2023',
    comments: 'Comments',
    title: 'Never Worry About What to Do About Banking Again',
    description: 'Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies.'
  },
  {
    id: 2,
    date: '18 Jul 2023',
    comments: 'Comments',
    title: 'Never Worry About What to Do About Banking Again',
    description: 'Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies.'
  },
  {
    id: 3,
    date: '18 Jul 2023',
    comments: 'Comments',
    title: 'Never Worry About What to Do About Banking Again',
    description: 'Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies.'
  },
  {
    id: 4,
    date: '18 Jul 2023',
    comments: 'Comments',
    title: 'Never Worry About What to Do About Banking Again',
    description: 'Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies.'
  },
  {
    id: 5,
    date: '18 Jul 2023',
    comments: 'Comments',
    title: 'Never Worry About What to Do About Banking Again',
    description: 'Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies.'
  },
  {
    id: 6,
    date: '18 Jul 2023',
    comments: 'Comments',
    title: 'Never Worry About What to Do About Banking Again',
    description: 'Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies.'
  },
];

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const blogTitle = slugToTitle(slug);

  return (
    <div className="w-full min-h-screen bg-white pt-[65px]">
      <div className='hidden'>
        <LaunchCompanyPopup />
      </div>
      <div className="max-w-[1280px] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Table of Content (Left) */}
        <aside className="md:col-span-1 bg-[#fafbfc] rounded-xl p-5 h-fit border border-[#ececec] w-full md:min-w-[220px] md:max-w-[270px]">
          <h2 className="font-inter font-semibold text-[24px] leading-[32px] text-black mb-5">Table Of Content</h2>
          <ul>
            {tableOfContents.map((item, index) => (
              <li
                key={index}
                className={`border-b ${item.isActive ? 'border-[#7856FC]' : 'border-[#E4E7EC]'
                  } ${index === tableOfContents.length - 1 ? '' :
                    item.isActive ? 'md:pb-[46px] pb-4 mb-4' : 'pb-4 mb-4'
                  }`}
              >
                <a
                  href={item.link}
                  className={`font-inter ${item.isActive
                    ? 'font-semibold text-[#7856FC]'
                    : 'font-semibold text-black'
                    } text-[18px] leading-[28px] hover:underline`}
                >
                  {index === 0 ? blogTitle : item.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Blog Content (Center) */}
        <main className="md:col-span-2">
          <p className="text-[#7856FC] text-[16px] leading-[24px] font-medium mb-3">Published 13 Jan 2024</p>
          <h2 className="font-inter text-[30px] leading-[38px] md:text-[48px] md:leading-[60px] font-semibold tracking-[-0.02em] text-black mb-6">A conversation with Lucy Bond</h2>
          <p className="font-inter text-[16px] leading-[24px] md:text-[20px] md:leading-[30px] font-normal text-[#475467] mb-6">Lucy Bond is an interior designer who started her career in New Zealand, working for large architectural firms. We chatted to her about design and life.</p>
          <h3 className="font-inter text-[24px] leading-[32px] md:text-[30px] md:leading-[38px] font-semibold text-black mb-6" id="section1">Introduction</h3>
          <p className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-4">Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.</p>
          <p className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-6">Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.</p>
          <img
            src="/blog-details/steady-formations-blog-details.png"
            alt="Steady Formations Blog Details"
            className="rounded-xl mb-6 w-full object-cover max-h-[350px]"
          />
          <div className="mb-12 pl-6 border-l-2 border-[#7856FC]">
            <p className="font-inter text-[24px] leading-[32px] font-medium italic text-black mb-4">
              "In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear."
            </p>
            <div className="flex items-center gap-3">
              <img
                src="/blog-details/designer-1-icon.png"
                alt="Olivia Rhye"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-inter text-[16px] leading-[24px] font-semibold text-black">Olivia Rhye</p>
                <p className="font-inter text-[16px] leading-[24px] font-normal text-[#475467]">Product Designer</p>
              </div>
            </div>
          </div>

          <p className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-6">
            Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisi vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.
          </p>

          <p className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-6">
            Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
          </p>

          <p className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-6">
            Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.
          </p>

          <h3 className="font-inter text-[24px] leading-[32px] md:text-[30px] md:leading-[38px] font-semibold text-black mb-6">Software and tools</h3>

          <p className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-6">
            Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.
          </p>

          <p className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-6">
            Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.
          </p>

          <h3 className="font-inter text-[24px] leading-[32px] md:text-[30px] md:leading-[38px] font-semibold text-black mb-6">Other resources</h3>

          <p className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-6">
            Sagittis et eu at elementum, quis in. Proin praesent volutpat egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi ac. Auctor rutrum lacus malesuada massa ornare et. Vulputate consectetur ac ultrices at diam dui eget fringilla tincidunt. Arcu sit dignissim massa erat cursus vulputate gravida id. Sed quis auctor vulputate hac elementum gravida cursus dis.
          </p>

          <ol className="list-decimal pl-6 mb-6">
            <li className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-2">
              Lectus id duis vitae porttitor enim gravida morbi.
            </li>
            <li className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-2">
              Eu turpis posuere semper feugiat volutpat elit, ultrices suspendisse. Auctor vel in vitae placerat.
            </li>
            <li className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-2">
              Suspendisse maecenas ac donec scelerisque diam sed est duis purus.
            </li>
          </ol>

          <img
            src="/blog-details/steady-formations-blog-details-image-2.png"
            alt="Steady Formations Blog Details 2"
            className="rounded-xl mb-6 w-full object-cover object-right h-[410px] md:max-h-[350px]"
          />

          <p className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-6">
            Lectus leo massa amet posuere. Malesuada mattis non convallis quisque. Libero sit et imperdiet bibendum quisque dictum vestibulum in non. Pretium ultricies tempor non est diam. Enim ut enim amet amet integer cursus. Sit ac commodo pretium sed etiam turpis suspendisse at.
          </p>

          <p className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-6">
            Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.
          </p>

          <div className="bg-[#F9FAFB] rounded-2xl p-8 mb-12">
            <h3 className="font-inter text-[24px] leading-[32px] md:text-[30px] md:leading-[38px] font-semibold tracking-[0px] text-black mb-[30px]">Conclusion</h3>

            <p className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-6">
              Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisi, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.
            </p>

            <p className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467] mb-6">
              Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.
            </p>

            <p className="font-inter text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] font-normal text-[#475467]">
              Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor.
            </p>
          </div>

          <div className="bg-[#F9FAFB] rounded-2xl p-6 mb-12">
            <div className="flex items-start gap-3">
              <img
                src="/blog-details/security-expert-icon.png"
                alt="Floyd Miles"
                className="w-[70px] h-[70px] rounded-full"
              />
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-inter text-[18px] leading-[28px] font-semibold text-black">Floyd Miles</p>
                  <p className="font-inter text-[14px] leading-[20px] font-normal text-[#475467]">Security Expert</p>
                </div>
                <p className="font-inter text-[16px] leading-[24px] font-normal text-[#475467]">As a result, this attack would never have worked. Even if axios was a dependency it was still missing as a requirement.</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-between items-center gap-12 mt-8">
            <div className="flex flex-col items-start w-1/2">
              <a href="#" className="flex items-center gap-3 border border-[#D0D5DD] rounded-lg py-2 px-4 text-[#000000] mb-2 hover:border-[#7856FC] hover:text-[#7856FC] transition-colors">
                <img src="/blog-details/arrow-left-icon.svg" alt="Previous" className="w-5 h-5" />
                <span className="font-inter font-semibold text-[14px] leading-[20px] tracking-[-0.017em]">Previous</span>
              </a>
              <p className="text-[14px] leading-[20px] font-medium text-[#101828] hover:text-[#7856FC] transition-colors cursor-pointer">Wise Spending Habits, 13 Tips for Maximizing Your Money.</p>
            </div>
            <div className="w-[1px] h-[64px] bg-[#D0D5DD]"></div>
            <div className="flex flex-col items-end w-1/2">
              <a href="#" className="flex items-center gap-3 border border-[#D0D5DD] rounded-lg py-2 px-4 text-[#000000] mb-2 hover:border-[#7856FC] hover:text-[#7856FC] transition-colors">
                <span className="font-inter font-semibold text-[14px] leading-[20px] tracking-[-0.017em]">Next</span>
                <img src="/blog-details/arrow-right-icon.svg" alt="Next" className="w-5 h-5" />
              </a>
              <p className="text-[14px] leading-[20px] font-medium text-[#101828] text-right hover:text-[#7856FC] transition-colors cursor-pointer">Wise Spending Habits, 13 Tips for Maximizing Your Money.</p>
            </div>
          </div>

        </main>

        {/* Sidebar (Right) */}
        <aside className="md:col-span-1 flex flex-col gap-6 w-full md:min-w-[250px] md:max-w-[320px]">
          <div className="flex flex-row md:flex-col gap-4 md:gap-6">
            <div className="bg-[#EBE8FF] rounded-xl p-6 flex flex-col flex-1 md:flex-none">
              <div className="flex -space-x-3 mb-4">
                <img src="/blog-details/advisor-icon-1.png" alt="Advisor 1" className="w-14 h-14 rounded-full border-2 border-white" />
                <img src="/blog-details/advisor-icon-2.png" alt="Advisor 2" className="w-14 h-14 rounded-full border-2 border-white" />
                <img src="/blog-details/advisor-icon-3.png" alt="Advisor 3" className="w-14 h-14 rounded-full border-2 border-white" />
              </div>
              <p className="font-inter font-semibold text-[20px] leading-[30px] text-black mb-4">Still unsure which structure fits your business best?</p>
              <button className="bg-[#7856FC] text-white rounded-lg px-3 py-2 font-medium font-inter text-[16px] leading-[24px]">Talk Business Advisor</button>
            </div>

            <div className="bg-white rounded-xl p-6 flex flex-col items-center border border-[#E4E7EC] w-auto md:w-full">
              <span className="font-inter font-semibold text-[20px] leading-[28px] text-black mb-6 w-full text-left">Share</span>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                <img src="/blog-details/instagram-active-icon.svg" alt="Instagram" className="w-6 h-6" />
                <img src="/blog-details/telegram-icon.svg" alt="Telegram" className="w-6 h-6" />
                <img src="/blog-details/tiktok-icon.svg" alt="TikTok" className="w-6 h-6" />
                <img src="/blog-details/youtube-icon.svg" alt="YouTube" className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-[#240D68] rounded-xl pt-6 px-6 pb-0 flex flex-col items-center text-center">
            <span className="font-inter font-semibold text-[30px] leading-[38px] md:text-[20px] md:leading-[28px] text-white mb-5 w-full text-center md:text-left">Launch Your U.S. Company</span>
            <button className="bg-[#7856FC] text-white rounded-lg px-3 py-2 font-medium font-inter mb-7 text-[16px] leading-[24px] w-full">Start Now</button>
            <img src="/blog-details/launch-company-US-sidebar-image.png" alt="Launch US Company" className="w-auto md:w-[160px] h-[319px] md:h-auto mx-auto mb-0" />
          </div>
        </aside>
      </div>

      {/* New Section Outside 3-Column Layout */}
      <section className="w-full max-w-[1280px] mx-auto mt-24 md:mt-28 mb-36 px-4 md:px-0">
        <h2 className="font-inter font-semibold text-[36px] leading-[44px] mb-[36px] tracking-[-0.02em] text-black">Read our latest posted blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8">
          {latestBlogsData.map((blog, idx) => (
            <div key={blog.id} className="mb-6">
              <div className="flex items-center gap-6 mb-2">
                <span className="flex items-center gap-2 font-inter font-medium text-[16px] leading-[27.2px] tracking-normal text-[#526061]">
                  <img src="/blog/date-icon.svg" alt="Date" className="w-4 h-4" />{blog.date}
                </span>
                <span className="flex items-center gap-2 font-inter font-medium text-[16px] leading-[27.2px] tracking-normal text-[#526061]">
                  <img src="/blog/comment-icon.svg" alt="Comments" className="w-4 h-4" />{blog.comments}
                </span>
              </div>
              <div className="font-inter font-semibold text-[18px] leading-[28px] mb-[18px] text-black">{blog.title}</div>
              <div className="font-inter font-normal text-[18px] leading-[28px] mb-[18px] text-[#475467]">{blog.description}</div>
              <div className="border-b border-[#EAECF0] mt-4" />
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1280px] mx-auto mt-[96px] px-4 md:px-0 pb-36">
        <div className="flex flex-col md:flex-row gap-[21px]">
          {/* Left Column */}
          <div className="w-full md:w-[66%]">
            <div className="bg-[#6C3EF5] rounded-2xl px-8 md:px-10 py-10 md:py-16 h-full flex flex-col justify-between text-white relative overflow-hidden">
              <div className="w-full md:w-[80%] mb-9">
                <h2 className="font-inter font-bold text-[36px] leading-[44px] tracking-[-0.02em] mb-9">Get expert advice and a custom strategy session worth $799 at no cost.</h2>
                <button className="w-full md:w-auto bg-white text-[#6C3EF5] font-medium rounded-md px-6 py-3 mb-10 shadow hover:bg-[#f3f0ff] transition">Book A Free Call</button>
                <p className="font-inter font-bold text-[24px] leading-[32px] mb-5 md:mb-6">"Our sales growth has increased by 150% in last month after usign Dopler."</p>
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