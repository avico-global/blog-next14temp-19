"use client"
import React, { useState, useEffect, useRef } from 'react'
import Container from '../common/Container'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { sanitizeUrl } from '@/lib/myFun'

export default function CategorySlider({ blog_list, imagePath }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [slidesToShow, setSlidesToShow] = useState(4);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const sliderRef = useRef(null);

    // Minimum swipe distance (in px) 

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && currentSlide < filteredData.length - slidesToShow) {
            goToSlide(currentSlide + 1);
        }
        if (isRightSwipe && currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    };


    // Add safety check for blog_list
    const filteredData = blog_list?.slice(0, 6) || [];
    const totalDots = Math.ceil((filteredData.length || 0) / slidesToShow);

    const goToSlide = (index) => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentSlide(index);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [currentSlide]);

    // Update the auto slide useEffect with safety check
    useEffect(() => {
        const autoSlide = setInterval(() => {
            if (!isAnimating && filteredData.length > 0) {
                setCurrentSlide(prev => 
                    prev === filteredData.length - slidesToShow ? 0 : prev + 1
                );
            }
        }, 5000);

        return () => clearInterval(autoSlide);
    }, [filteredData.length, slidesToShow, isAnimating]);

    // Add a guard clause to prevent rendering if no data
    if (!filteredData.length) {
        return null;
    }

    return (
        <div>
            <div className="relative   ">
                <div className="relative overflow-hidden ">

                    <div 
                        ref={sliderRef}
                        className="flex transition-transform duration-500 ease-in-out touch-pan-y"
                        style={{
                            transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
                        }}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        {filteredData?.map((item, index) => (
                            <Link 
                                href={`/${sanitizeUrl(item?.title)}`} 
                                key={index}
                                className={`min-w-[25%] px-3 pb-3`}
                            >
                                <div className="relative group overflow-hidden aspect-[5/3]">
                                    <Image 
                                        priority
                                        src={`${imagePath}/${item?.image}`} 
                                        alt={item.title} 
                                        width={1000}
                                        height={1000}
                                        className="object-cover transition-transform duration-500 aspect-[5/3] group-hover:scale-110" 
                                    />
                                </div>
                                <div className=" flex flex-col gap-1  py-2">
                                   <h2 className="text-black leading-5 text-base line-clamp-2 font-montserrat ">{item?.title}</h2>
                                   <p className="text-gray-500 text-xs">{item?.published_at}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-row gap-2">
                    <button 
                        onClick={() => currentSlide > 0 && goToSlide(currentSlide - 1)}
                        className={` z-10 bg-white/80 p-1 border  hover:bg-primary transition-all ${
                            currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                        }`}
                        disabled={currentSlide === 0}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => currentSlide < filteredData.length - slidesToShow && goToSlide(currentSlide + 1)}
                        className={` z-10 bg-white/80 p-1 border hover:bg-primary transition-all hover:text-white ${
                            currentSlide >= filteredData.length - slidesToShow ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                        }`}
                        disabled={currentSlide >= filteredData.length - slidesToShow}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
