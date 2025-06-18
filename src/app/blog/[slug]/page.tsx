"use client";
import React from 'react';
import { useParams } from 'next/navigation';

function slugToTitle(slug: string): string {
  if (!slug) return '';
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c: string) => c.toUpperCase());
}

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const blogTitle = slugToTitle(slug);

  return (
    <div className="w-full min-h-screen bg-white pt-[65px]">
      <div className="max-w-[1280px] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Table of Content (Left) */}
        <aside className="hidden md:block md:col-span-1 bg-[#fafbfc] rounded-xl p-6 h-fit border border-[#ececec] min-w-[220px] max-w-[270px]">
          <h2 className="font-inter font-semibold text-[24px] leading-[32px] text-black mb-5">Table Of Content</h2>
          <ul>
            <li className="border-b border-[#E4E7EC] pb-4 mb-4">
              <span className="font-inter font-medium text-[16px] cursor-pointer leading-[24px] text-[#7856FC]">{blogTitle}</span>
            </li>
            <li className="border-b border-[#E4E7EC] pb-4 mb-4">
              <a href="#section2" className="font-inter font-normal text-[16px] leading-[24px] text-black hover:underline">Why Do You Need a B2B Website Design Agency for Your Business?</a>
            </li>
            <li className="border-b border-[#E4E7EC] pb-4 mb-4">
              <a href="#section3" className="font-inter font-normal text-[16px] leading-[24px] text-black hover:underline">7 Best B2B Website Design Agencies</a>
            </li>
            <li>
              <a href="#section4" className="font-inter font-normal text-[16px] leading-[24px] text-black hover:underline">How to Choose the Best B2B Website Design Agency?</a>
            </li>
          </ul>
        </aside>

        {/* Main Blog Content (Center) */}
        <main className="md:col-span-2">
          <p className="text-[#7856FC] font-medium mb-2">Published 13 Jan 2024</p>
          <h1 className="text-4xl font-bold mb-2">A conversation with Lucy Bond</h1>
          <p className="text-lg text-gray-700 mb-6">Lucy Bond is an interior designer who started her career in New Zealand, working for large architectural firms. We chatted to her about design and life.</p>
          <h2 className="text-2xl font-bold mb-2 text-black" id="section1">Introduction</h2>
          <p className="mb-4">Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.</p>
          <p className="mb-4">Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.</p>
          <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80" alt="Interview" className="rounded-xl mb-6 w-full object-cover max-h-[350px]" />
          <h2 className="text-2xl font-bold mb-2 text-black" id="section2">Why Do You Need a B2B Website Design Agency for Your Business?</h2>
          <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.</p>
          <h2 className="text-2xl font-bold mb-2 text-black" id="section3">7 Best B2B Website Design Agencies</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Agency One</li>
            <li>Agency Two</li>
            <li>Agency Three</li>
          </ul>
          <h2 className="text-2xl font-bold mb-2 text-black" id="section4">How to Choose the Best B2B Website Design Agency?</h2>
          <p className="mb-4">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper.</p>
        </main>

        {/* Sidebar (Right) */}
        <aside className="hidden md:flex flex-col gap-6 md:col-span-1 min-w-[250px] max-w-[320px]">
          <div className="bg-[#f4f3ff] rounded-xl p-6 flex flex-col items-center text-center">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Advisor" className="w-12 h-12 rounded-full mb-2" />
            <p className="font-semibold mb-2 text-black">Still unsure which structure fits your business best?</p>
            <button className="bg-[#7856FC] text-white rounded-md px-4 py-2 font-medium">Talk Business Advisor</button>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#ececec] flex flex-col items-center">
            <span className="font-semibold mb-2 text-black">Share</span>
            <div className="flex gap-3">
              <a href="#" className="text-[#7856FC] text-xl">&#x1F4F7;</a>
              <a href="#" className="text-[#7856FC] text-xl">&#x1F4F1;</a>
              <a href="#" className="text-[#7856FC] text-xl">&#x1F3A4;</a>
            </div>
          </div>
          <div className="bg-[#532bcf] rounded-xl p-6 text-white flex flex-col items-center">
            <span className="font-semibold mb-2">Launch Your U.S. Company</span>
            <button className="bg-white text-[#532bcf] rounded-md px-4 py-2 font-medium mb-2">Start Now</button>
            <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="Advisor" className="w-10 h-10 rounded-full" />
          </div>
        </aside>
      </div>
    </div>
  );
} 