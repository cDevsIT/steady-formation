'use client';

import { useState } from 'react';
import { Review } from '@/types/review';
import Image from './Image';

interface ReviewCardProps {
    review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const getReviewTypeIcon = () => {
        switch (review.type) {
            case 'trustpilot':
                return (
                    <div className="flex items-center gap-2 justify-between">
                        <Image
                            className="w-[121px]"
                            url='/icons/rating_stars.svg'
                            alt='Rating Stars'
                            width={130}
                            height={25}
                        />

                        <Image
                            className="w-[100px]"
                            url='/icons/trustpilot_logo.svg'
                            alt='Trust Pilot'
                            width={100}
                            height={25}
                        />

                    </div>
                );
            case 'google':
                return (
                    <div className="flex items-center gap-2 justify-between">
                        <Image
                            className="w-[121px]"
                            url='/icons/google_review.svg'
                            alt='Rating Stars'
                            width={130}
                            height={25}
                        />
                        <Image
                            className="w-[100px]"
                            url='/icons/google_logo.svg'
                            alt='Google'
                            width={100}
                            height={25}
                        />
                    </div>
                );
            case 'video':
                return (
                    <div className="flex items-start gap-4 mb-4">
                        <Image
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                            url={review.profileImage}
                            alt={`${review.name}'s profile`}
                            width={55}
                            height={55}
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm">{review.name}</h3>
                            <p className="text-gray-600 text-sm">{review.position}</p>
                        </div>
                    </div>
                );
            default:
                return <div className="flex"></div>;
        }
    };

    if (review.type === 'video') {
        return (
            <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                {/* Video Section */}
                <div className="relative aspect-video bg-gray-100">
                    {!isVideoPlaying ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                            <button
                                onClick={() => setIsVideoPlaying(true)}
                                className="group relative pointer"
                                aria-label={`Play video review by ${review.name}`}
                            >
                                <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg  group-hover:scale-110 transition-all duration-300">
                                    <Image
                                        
                                        url='/icons/video_play.svg'
                                        alt='Video Play'
                                        width={55}
                                        height={55}
                                    />
                                </div>
                            </button>
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                    ) : (
                        <video
                            controls
                            autoPlay
                            className="w-full h-full object-cover"
                            src={review.videoUrl}
                            aria-label={`Video review by ${review.name}`}
                        >
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>

                {/* Customer Info Section */}
                <div className="p-6">
                    <div className="space-y-3">
                        {getReviewTypeIcon()}
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative">
            {/* Header with Profile */}
            <header className="flex items-start gap-4 mb-4">
                <Image
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                    url={review.profileImage}
                    alt={`${review.name}'s profile`}
                    width={55}
                    height={55}
                />
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">{review.name}</h3>
                    <p className="text-gray-600 text-sm">{review.position}</p>
                </div>
            </header>

            {/* Review Content */}
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-gray-900 mb-2 leading-tight">{review.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.description}</p>
                </div>

                {/* Rating and Platform */}
                <div className="pt-2 border-t border-gray-100 absolute w-[88%] bottom-[11px]">
                    {getReviewTypeIcon()}
                </div>
            </div>
        </article>
    );
};

export default ReviewCard;