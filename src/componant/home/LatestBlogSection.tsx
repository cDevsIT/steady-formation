import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import Image from '../ui/Image';
import CarouselSlider from '../ui/CarouselSlider';
import blogService, { Blog, getBaseUrl } from '@/lib/blogService';

interface BlogPost {
    title: string;
    date: string;
    img: string;
    comments: string;
    alt: string;
    slug: string;
}


export default async function LatestBlogSection() {
    const baseUrl = getBaseUrl();
    
    // Fetch blogs data at build time (SSG)
    let blogs: Blog[] = [];
    let error: string | null = null;

    try {
        const response = await blogService.getAllBlogs(1);
        
        if (response.status === 'success' && response.data) {
            blogs = response.data.data;
        } else {
            throw new Error(response.message || 'Failed to fetch blogs');
        }
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('❌ Error fetching blogs:', errorMessage);
        error = errorMessage;
    }

    // Convert API blog data to component format
    const convertBlogToCard = (blog: Blog) => ({
        img: `${baseUrl}/storage/uploads/blog/${blog.feature_image}` || `/blog/Steady-formations-blog-image-1.png`,
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

    // Get business ideas (remaining blogs)
    const blogPosts = blogs.slice(0, 6).map(convertBlogToCard);

    const BlogCard = ({ post }: { post: BlogPost }) => (
        <article className="">
            <Link
                key={post.alt}
                href={`/blog/${post.slug}`}
                className=" rounded-xl cursor-pointer"
            >
                <Image
                    url={post.img}
                    alt={post.alt}
                    className="w-full h-[220px] object-cover rounded-xl mb-4"
                    width={400}
                    height={250}
                />
                <div className="flex items-center gap-6 mb-2">
                    <div className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-3">
                        <Image url="/blog/date-icon.svg" alt="Date" className="w-5 h-5" />
                        <span className='whitespace-nowrap'>{post.date}</span>
                    </div>
                    <div className="font-inter font-medium text-[16px] leading-6 text-[#475467] flex items-center gap-3">
                        <Image url="/blog/comment-icon.svg" alt="Comments" className="w-5 h-5" />
                        <span className='whitespace-nowrap'>{post.comments}</span>
                    </div>
                </div>
                <h3 className="font-inter font-bold text-[20px] leading-[30px] text-[#081717] mt-2 text-start">
                    {post.title}
                </h3>
            </Link>
        </article>
    );

    // Handle error state
    if (error) {
        return (
            <div className="pb-20 px-4 bg-white">
                <div className="max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto px-0 lg:px-10">
                    <h2 className="text-[30px] lg:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-gray-900 mb-6 text-center max-w-[807px] mx-auto">
                        Read our latest posted blog
                    </h2>
                    <div className="text-center text-red-600">
                        <p>Unable to load blog posts. Please try again later.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-20 px-4 bg-white">
            <div className="max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto px-0 lg:px-10">
                {/* Header */}
                <h2 className="text-[30px] lg:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-gray-900 mb-6 text-center max-w-[807px] mx-auto">
                    Read our latest posted blog
                </h2>
                {/* Desktop Layout - 3 Columns */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <BlogCard key={index} post={post} />
                    ))}
                </div>

                {/* Mobile Layout - Carousel */}
                <CarouselSlider className="lg:hidden">
                    {blogPosts.map((post, index) => (
                        <div key={index}>
                            <BlogCard post={post} />
                        </div>
                    ))}
                </CarouselSlider>
            </div>
        </div>
    );
}