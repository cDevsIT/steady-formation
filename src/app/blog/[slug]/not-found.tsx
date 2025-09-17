import React from 'react';
import Link from 'next/link';
import Image from '@/componant/ui/Image';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-white pt-[70px] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <Image 
            url="/404-blog.svg" 
            alt="Blog not found" 
            className="w-64 h-64 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the blog post you're looking for. It might have been moved or deleted.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/blog" 
            className="inline-block bg-[#7856FC] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6B46C1] transition-colors"
          >
            Browse All Blogs
          </Link>
          
          <div className="text-sm text-gray-500">
            or
          </div>
          
          <Link 
            href="/" 
            className="inline-block text-[#7856FC] hover:underline font-medium"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}