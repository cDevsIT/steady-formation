'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { blogService, Blog } from '@/services/blogService';

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogService.getBlogBySlug(params.slug as string);
        if (response.status === 'success') {
          setBlog(response.data);
        }
      } catch (err) {
        setError('Failed to fetch blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.slug]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!blog) return <div className="text-center">Blog post not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>By {blog.author.name}</span>
          <span>•</span>
          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
          <span>•</span>
          <span className="bg-gray-100 rounded-full px-3 py-1 text-sm">
            {blog.category.name}
          </span>
        </div>

        <div className="prose max-w-none mb-8">
          <p className="text-xl text-gray-600 mb-8">{blog.description}</p>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
          {blog.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
} 