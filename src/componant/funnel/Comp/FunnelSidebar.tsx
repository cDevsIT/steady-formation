import CarouselSlider from '../../ui/CarouselSlider';
import { sampleReviews } from '../../data/review';
import Button from '../../ui/Button';
import { useState } from 'react';
import Image from '@/componant/ui/Image';
import Rating from '@/componant/shared/Rating';

const orderSummary = [
    { label: 'Incorporation of Your Company', value: 'Free' },
    { label: 'Business Address Fee', value: '$0.00' },
    { label: 'Registered Agent for 1 Year', value: 'Free' },
    { label: 'Multimember Fee', value: '$100.00' },
    { label: 'EIN', value: '$0.00' },
    { label: 'Operating Agreement', value: '$0.00' },
    { label: 'Expedite Processing', value: '$0.00' },
    { label: 'State Fee', value: '$100.00' },
];

const FunnelSidebar = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const reviews = sampleReviews.slice(0, 3);

    // Avatars for the expert section
    const expertAvatars = [
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://randomuser.me/api/portraits/women/44.jpg',
        'https://randomuser.me/api/portraits/men/45.jpg',
        'https://randomuser.me/api/portraits/women/46.jpg',
    ];

    // Custom arrows for the carousel
    const ArrowButton = ({ direction, onClick, disabled }: { direction: 'left' | 'right'; onClick?: () => void; disabled?: boolean }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow hover:bg-gray-100 transition disabled:opacity-50"
            aria-label={direction === 'left' ? 'Previous review' : 'Next review'}
            style={{ zIndex: 2 }}
        >
            <Image
                url={direction === 'left' ? '/icons/arrow-left.svg' : '/icons/arrow-right.svg'}
                alt={direction === 'left' ? 'Left arrow' : 'Right arrow'}
                width={20}
                height={20}
            />
        </button>
    );

    // Custom review card
    const ReviewCardCustom = ({ review }: { review: any }) => (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 max-w-[451px]">
            <Image className='max-w-[112px]' url={`${review.type === 'trustpilot' ? '/icons/rating_stars.svg' : '/icons/google_review.svg'}`} alt="stars" width={60} height={16} />
            <p className="text-[#000000] text-[14px] mb-2 text-start">{review.description}</p>

            <div className='flex justify-start items-center gap-3'>
                <Image url={review.profileImage} alt={review.name} width={40} height={40} className="!w-[44px] rounded-full border-2 border-gray-100" />
                <h4 className='text-[#000000] text-[14px] font-bold'>{review.name}</h4>
            </div>
        </div>
    );

    return (
        <div className="hidden lg:flex flex-col gap-6 max-w-[452px]">
            <Image className='w-[452px]' url="/funnel/funnel-sidebar-head.svg" alt="stars" width={452} height={195} />
            {/* Order Summary Section */}
            <div className="bg-gray-100 rounded-xl shadow p-4 mb-2">
                <div className="font-bold text-[20px]">Order Summary</div>
                <div className="divide-y space-y-1 divide-gray-100">
                    {orderSummary.map((item, idx) => (
                        <div key={item.label} className="flex justify-between py-1 text-[16px]">
                            <span className="text-gray-700">{item.label}</span>
                            <span className="font-medium text-gray-900">{item.value}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between font-bold text-[16px] mt-3 pt-2 border-t-2 border-gray-200">
                    <span>Total Order</span>
                    <span>$0.00</span>
                </div>
            </div>

            {/* Review Slider Section */}
            <div className="">
                <CarouselSlider
                    className="relative"
                    selectedItem={currentSlide}
                    onChange={setCurrentSlide}
                    showIndicators={false}
                >
                    {reviews.map((review) => (
                        <div key={review.id} >
                            <ReviewCardCustom review={review} />
                        </div>
                    ))}
                </CarouselSlider>
                {/* Custom Arrows and Bullets */}
                <div className="flex items-center justify-between gap-4 mt-4">
                    <ArrowButton
                        direction="left"
                        onClick={() => setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
                    />
                    {/* Bullets */}
                    <div className="flex gap-2">
                        {reviews.map((_, idx) => (
                            <button
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${currentSlide === idx ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`}
                                onClick={() => setCurrentSlide(idx)}
                                aria-label={`Go to review ${idx + 1}`}
                            />
                        ))}
                    </div>
                    <ArrowButton
                        direction="right"
                        onClick={() => setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))}
                    />
                </div>
            </div>

            {/* Review Score Section */}
            <Rating maxWidth={false} className="border w-full border-[#EBE8FF] hidden lg:flex" radius={false} />

            {/* Need Help form expert? Section */}
            <div className="bg-[#F4F6FB] rounded-xl shadow flex justify-between items-center gap-3 p-4 mb-3">
                <div>
                    <span className="font-semibold text-black text-[16px] mb-3 block text-start">Need Help form expert?</span>
                    <Image
                        url='/funnel/funnel-sidebar-persons.png'
                        alt='Group Image'
                        width={135}
                        height={42}
                        className={`w-[135px] rounded-full border-2 border-white -ml-2 first:ml-0`}
                    />
                </div>

                <Button className="w-full max-w-[193px]" theme="primary">Book an appointment</Button>
            </div>
        </div>
    );
};

export default FunnelSidebar;