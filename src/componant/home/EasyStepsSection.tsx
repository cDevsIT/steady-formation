"use client"
import { useState, useEffect, useRef } from 'react';
import Image from '../ui/Image';

interface Card {
    id: number;
    number: string;
    title: string;
    description: string;
  }

const EasyStepsSection: React.FC = () => {
    const [activeCard, setActiveCard] = useState<number>(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const cards: Card[] = [
        {
            id: 1,
            number: "1",
            title: "Choose Your Company Name",
            description: "Pick a unique name and we'll check if it's available and compliant with state rules.",
        },
        {
            id: 2,
            number: "2",
            title: "Select the Best State for Your Business",
            description: "We'll help you choose the optimal state for incorporation based on your business needs.",
        },
        {
            id: 3,
            number: "3",
            title: "Complete a Simple Online Form",
            description: "Fill out our streamlined application with all the necessary business information.",
        },
        {
            id: 4,
            number: "4",
            title: "Receive Your Company Kit Digitally",
            description: "Get all your official documents and certificates delivered electronically.",
        }
    ];

    const handleCardClick = (cardId: number): void => {
        if(activeCard === cardId){
            setActiveCard(1)
        }else{
            setActiveCard(cardId);
        }
    };

    const resetCards = (): void => {
        setActiveCard(1);
    };

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setActiveCard(1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <section className='pt-20 mb-4 px-4 bg-white'>
            <div className='max-w-[1512px] mx-auto'>
                <h2 className="text-[30px] lg:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-gray-900 mb-6  text-center max-w-[600px] mx-auto">
                    Start Your U.S. Company in 4 Easy Steps
                </h2>
                <div className="bg-white min-h-[500px] items-center justify-between p-6 hidden xl:flex">
                    <Image
                        className="w-[663px] mb-8"
                        url='/homepage/four_steps_image.png'
                        alt='Start US Company'
                        width={663}
                        height={450}
                    />
                    <div className="max-w-4xl w-full relative">


                        {/* Cards Container */}
                        <div ref={containerRef} className="relative flex items-center justify-center" style={{ perspective: '1000px' }}>
                            {cards.map((card, index) => (
                                <div
                                    key={card.id}
                                    onClick={() => handleCardClick(card.id)}
                                    className={`
                            absolute w-[414px] h-[252px] rounded-4xl p-10 cursor-pointer
                            transition-all duration-700 ease-out transform-gpu
                            shadow-xl text-white
                            ${activeCard === card.id
                                            ? 'bg-[#7856FC] scale-110 z-10 shadow-2xl'
                                            : 'bg-gradient-to-b from-[#ECE2FF] to-[#FFFFFF] z-auto'
                                        }
                            `}
                                    style={{
                                        transform: `
                  translate(-50%, -50%) 
                  translateX(${index > 0 ? `${index * 40}px` : '0px'})
                  translateY(${index * 60}px) 
                `,
                                        zIndex: activeCard === card.id ? 10 : 4 - index,
                                        left: '50%'
                                    }}
                                >
                                    {/* Card Number */}
                                    {activeCard === card.id &&
                                        <div className="absolute top-0 right-6 text-[100px] font-bold opacity-30">
                                            {card.number}
                                        </div>}


                                    {/* Card Content */}
                                    <div className="relative z-10">
                                        <h3 className={`text-[30px] leading-[38px] mb-2 font-medium max-w-[260px] ${activeCard === card.id ? 'text-white' : 'text-black'}`}>
                                            {card.title}
                                        </h3>

                                        {activeCard === card.id ?
                                            <p className={`text-[16px] leading-relaxed mt-[15px] ${activeCard === card.id ? 'text-white' : 'text-black'}`}>
                                                {card.description}
                                            </p> :
                                            <div className='mt-[24px] flex justify-start items-center gap-3'>
                                                <div className='text-[60px] font-bold text-gray-200'>
                                                    {card.number}
                                                </div>

                                                <h4 className={`text-[18px] leading-[24px] mb-2 font-medium max-w-[260px] text-black`}>
                                                    {card.title}
                                                </h4>
                                            </div>}


                                    </div>

                                    {/* Active Indicator */}
                                    {activeCard === card.id && (
                                        <div className="absolute inset-0 rounded-2xl border-2 border-white/50 pointer-events-none animate-pulse" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className=' xl:hidden flex flex-col gap-3'>
                    <Image
                        className="w-[663px] mb-8"
                        url='/homepage/four_steps_image.png'
                        alt='Start US Company'
                        width={663}
                        height={450}
                    />

                    <div className='mt-[-100px}'>
                        {cards.map((card,i)=>{
                            return <div key={i} className={`w-[330px] h-[215px] rounded-xl p-4 mb-3 cursor-pointer
                            transition-all duration-700 ease-out transform-gpu text-white
                            ${activeCard === card.id
                                    ? 'bg-[#7856FC] z-10 '
                                    : 'bg-gradient-to-b from-[#ECE2FF] to-[#FFFFFF] z-auto border border-gray-200'
                                        }
                            `} onClick={() => handleCardClick(card.id)}>
                                <div className={`absolute top-[-10px] right-5 text-[60px] font-bold  ${activeCard === card.id ? 'opacity-30' :'opacity-100'}`}>
                                    {card.number}
                                </div>

                                <div className="relative z-10">
                                    <h3 className={`text-[24px] leading-[32px] mb-2 font-medium max-w-[260px] ${activeCard === card.id ? 'text-white' : 'text-black'}`}>
                                        {card.title}
                                    </h3>

                                    <p className={`text-[16px] leading-relaxed mt-[15px] ${activeCard === card.id ? 'text-white' : 'text-black'}`}>
                                        {card.description}
                                    </p> 


                                </div>
                            </div>
                        })}
                        
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EasyStepsSection;