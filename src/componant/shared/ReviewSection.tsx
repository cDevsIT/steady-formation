'use client';

import { useState, useEffect, useRef } from 'react';
import { ReviewsSectionProps } from '@/types/review';
import Image from '../ui/Image';
import ReviewCard from '../ui/ReviewCard';

const ReviewsSection = ({ reviews, variant, title, subtitle }: ReviewsSectionProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Update items per page based on variant and screen size
    useEffect(() => {
        const updateItemsPerPage = () => {
            if (variant === 'review-page') {
                if (window.innerWidth < 640) {
                    setItemsPerPage(4);
                } else if (window.innerWidth < 1024) {
                    setItemsPerPage(6);
                } else {
                    setItemsPerPage(9);
                }
            }
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, [variant]);

    // Get reviews for current page (for review-page variant)
    const getCurrentPageReviews = () => {
        if (variant === 'home') {
            return reviews.slice(0, 9); // Always show max 9 for home
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return reviews.slice(startIndex, endIndex);
    };

    // Calculate total pages for pagination
    const totalPages = variant === 'review-page' ? Math.ceil(reviews.length / itemsPerPage) : 1;

    // Slider functionality for home page
    const getVisibleReviews = () => {
        const homeReviews = reviews.slice(0, 9);

        if (typeof window === 'undefined') return homeReviews;

        if (window.innerWidth >= 1024) {
            return homeReviews; // Show all 9 on desktop
        } else if (window.innerWidth >= 768) {
            // Show 2 at a time on tablet
            return homeReviews.slice(currentSlide * 2, currentSlide * 2 + 2);
        } else {
            // Show 1 at a time on mobile
            return homeReviews.slice(currentSlide, currentSlide + 1);
        }
    };

    const getMaxSlides = () => {
        if (typeof window === 'undefined') return 0;

        const homeReviews = Math.min(reviews.length, 9);

        if (window.innerWidth >= 1024) {
            return 0; // No sliding on desktop
        } else if (window.innerWidth >= 768) {
            return Math.ceil(homeReviews / 2) - 1;
        } else {
            return homeReviews - 1;
        }
    };

    const nextSlide = () => {
        const maxSlides = getMaxSlides();
        setCurrentSlide(prev => (prev < maxSlides ? prev + 1 : 0));
    };

    const prevSlide = () => {
        const maxSlides = getMaxSlides();
        setCurrentSlide(prev => (prev > 0 ? prev - 1 : maxSlides));
    };

    // Touch/Mouse handlers for mobile swipe
    const handleMouseDown = (e: React.MouseEvent) => {
        if (variant !== 'home' || window.innerWidth >= 1024) return;

        setIsDragging(true);
        setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
        setScrollLeft(sliderRef.current?.scrollLeft || 0);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (variant !== 'home' || window.innerWidth >= 1024) return;

        setIsDragging(true);
        setStartX(e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0));
        setScrollLeft(sliderRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || variant !== 'home' || window.innerWidth >= 1024) return;

        e.preventDefault();
        const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2;

        if (Math.abs(walk) > 50) {
            if (walk > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
            setIsDragging(false);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || variant !== 'home' || window.innerWidth >= 1024) return;

        const x = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2;

        if (Math.abs(walk) > 50) {
            if (walk > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
            setIsDragging(false);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const displayReviews = variant === 'home' ? getVisibleReviews() : getCurrentPageReviews();

    return (
        <section className="pb-20 px-4 bg-white" aria-labelledby="reviews-heading">
            <div className="max-w-[1512px] mx-auto">
                {/* Section Header */}
                <div className="text-center rounded-xl lg:rounded-3xl pt-13 pb-50 px-[38px] md:px-[150px] lg:px-[200px] bg-[#F2F4F7]">
                    <h2 className="text-[27px] lg:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-gray-900 mb-6 ">
                        Trusted by 26,000+ customers
                    </h2>
                </div>

                {/* Reviews Grid */}
                <div className="relative mt-[-170px] px-3 lg:px-10">
                    <div
                        ref={sliderRef}
                        className={`grid gap-6 ${variant === 'home'
                                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'
                            } ${variant === 'home' ? 'lg:cursor-default cursor-grab active:cursor-grabbing' : ''}`}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {displayReviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>

                    {/* Slider Controls for Home Page - Mobile/Tablet Only */}
                    {variant === 'home' && (
                        <div className="lg:hidden">
                            {/* Bullet Points */}
                            <div className="flex justify-center gap-2 mt-8">
                                {Array.from({ length: getMaxSlides() + 1 }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                                                ? 'bg-blue-600 scale-110'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Pagination for Review Page */}
                {variant === 'review-page' && totalPages > 1 && (
                    <nav className="flex justify-center items-center gap-4 mt-12" aria-label="Reviews pagination">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="flex items-center gap-2"
                        >
                            <Image
                                className="w-4"
                                url='/icons/arrow-left.svg'
                                alt='Left Arrow'
                                width={20}
                                height={20}
                            />
                            Previous
                        </button>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                                const pageNum = currentPage <= 3
                                    ? index + 1
                                    : currentPage + index - 2;

                                if (pageNum > totalPages) return null;

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className="w-10 h-10"
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <>
                                    <span className="px-2">...</span>
                                    <button
                                        onClick={() => setCurrentPage(totalPages)}
                                        className="w-10 h-10"
                                    >
                                        {totalPages}
                                    </button>
                                </>
                            )}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-2"
                        >
                            Next
                            <Image
                                className="w-4"
                                url='/icons/arrow-right.svg'
                                alt='Right Arrow'
                                width={20}
                                height={20}
                            />
                        </button>
                    </nav>
                )}
            </div>
        </section>
    );
};

export default ReviewsSection;