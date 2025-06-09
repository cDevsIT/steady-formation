'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { blogService, Blog } from '@/services/blogService';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchBlogs = async () => {
      try {
        console.log('Starting to fetch blogs...');
        const response = await blogService.getAllBlogs();
        console.log('Received response:', response);

        if (!isMounted) return;

        if (response?.status === 'success' && Array.isArray(response?.data?.data)) {
          setBlogs(response.data.data);
        } else {
          console.error('Invalid response format:', response);
          setError('The server returned an invalid response format. Please try again later.');
        }
      } catch (err) {
        console.error('Error in fetchBlogs:', err);
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unexpected error occurred while fetching blogs. Please try again later.');
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  // Debug render
  console.log('Current state:', { loading, error, blogsCount: blogs.length });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <span className="ml-3">Loading blogs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <div className="mt-4">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-2 px-4 rounded mr-2"
            >
              Try Again
            </button>
            <button 
              onClick={() => window.location.href = '/'} 
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <div className="text-center text-gray-600">
          <p className="mb-4">No blog posts found.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <article key={blog.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <Link href={`/blog/${blog.slug}`} className="block">
              <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">{blog.title}</h2>
            </Link>
            <p className="text-gray-600 mb-4">{blog.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>By {blog.author.name}</span>
              <span>{new Date(blog.created_at).toLocaleDateString()}</span>
            </div>
            <div className="mt-4">
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">
                {blog.category.name}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 