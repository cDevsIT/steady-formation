'use client';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type CustomCarouselSliderProps = {
  children: React.ReactElement[];
  className?: string;
};

const CarouselSlider: React.FC<CustomCarouselSliderProps> = ({ children, className = '' }) => {
  return (
    <div className={`${className}`}>
      <style jsx global>{`
                .carousel-root {
                  outline: none;
                }
                
                .carousel .carousel-status {
                  display: none;
                }
                
                .carousel .control-arrow {
                  display: none;
                }
                
                .carousel .carousel-slider {
                  overflow: visible;
                  padding-bottom:10px;
                }
                
                .carousel .slider-wrapper {
                  overflow: visible;
                }
                
                .carousel .slider {
                  overflow: visible;
                }
                
                .carousel .slide {
                  background: transparent;
                  padding: 0 16px;
                }
                
                .carousel .control-dots {
                  margin: 32px 0 0 0;
                  padding: 0;
                  text-align: center;
                }
                
                .carousel .control-dots .dot {
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background: #d1d5db;
                  margin: 0 4px;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  opacity: 1;
                  box-shadow: none;
                  border: none;
                }
                
                .carousel .control-dots .dot:hover {
                  background: #9ca3af;
                  transform: scale(1.1);
                }
                
                .carousel .control-dots .dot.selected {
                  background: #2563eb;
                  transform: scale(1.25);
                }
                
                .carousel .thumbs-wrapper {
                  display: none;
                }
                        `}</style>

      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true}
        useKeyboardArrows={true}
        dynamicHeight={false}
        centerMode={false}
        centerSlidePercentage={100}
        className="carousel-container"
      >
        {children}
      </Carousel>
    </div>
  );
};

export default CarouselSlider;