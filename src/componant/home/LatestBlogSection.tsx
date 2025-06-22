import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import Image from '../ui/Image';
import CarouselSlider from '../ui/CarouselSlider';

interface BlogPost {
    title: string;
    date: string;
    img: string;
    comments: string;
    alt: string;
    slug: string;
}


const blogPosts: BlogPost[] = [
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

export default function LatestBlogSection() {

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

    return (
        <div className="pb-20 px-4 bg-white">
            <div className="max-w-[1512px] mx-auto px-0 lg:px-10">
                {/* Header */}
                {/* Header */}
                <h2 className="text-[30px] lg:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-gray-900 mb-6  text-center max-w-[807px] mx-auto">
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