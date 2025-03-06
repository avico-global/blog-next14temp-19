import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sanitizeUrl } from "../../lib/myFun";

export default function Slider({ blog_list, imagePath, className }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Update slidesToShow based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Add a guard clause to prevent rendering if no data
  if (!filteredData.length) {
    return null;
  }

  return (
    <div className=" overflow-hidden ">
      <div className="relative overflow-hidden -mx-3 ">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out touch-pan-y"
          style={{
            transform: `translateX(-${(currentSlide * 100) / slidesToShow}%)`,
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {filteredData?.map((item, index) => (
            <div
              key={index}
              className={`min-w-[50%] md:min-w-[33.33%] px-[10px] group pb-3`}
            >
              <div className="relative group overflow-hidden aspect-[12/8.5]">
                <div className="relative overflow-hidden aspect-[12/8.5]">
                  <Link href={`/${sanitizeUrl(item?.title)}`}>
                    <Image
                      src={`${imagePath}/${item?.image}`}
                      alt={item.title}
                      width={1800}
                      height={1800}
                      className="w-full h-full object-cover aspect-[12/8.5]"
                    />
                  </Link>
                  <Link
                    href={`/category/${item.article_category}`}
                    className="text-[10px] px-1 text-white py-[2px] bg-quinary hover:bg-tertiary transition-all duration-300 font-montserrat absolute bottom-0 left-0"
                  >
                    {item.article_category}
                  </Link>
                </div>
              </div>
              <div className="flex pl-1 flex-col gap-1 py-2">
                <Link
                  href={`/${sanitizeUrl(item?.title)}`}
                  className="text-black group-hover:text-quaternary transition-all duration-300 leading-5 text-base line-clamp-2 font-montserrat"
                >
                  {item?.title}
                </Link>
                <p className="text-gray-500 text-xs">{item?.published_at}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row  pl-3 gap-2">
          <button
            onClick={() =>
              currentSlide > 0 && goToSlide(currentSlide - slidesToShow)
            }
            className={`z-10 bg-white/80 p-1 border hover:bg-primary transition-all hover:text-white ${
              currentSlide === 0
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100"
            }`}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              currentSlide < filteredData.length - slidesToShow &&
              goToSlide(currentSlide + slidesToShow)
            }
            className={`z-10 bg-white/80 p-1 border hover:bg-primary transition-all hover:text-white ${
              currentSlide >= filteredData.length - slidesToShow
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100"
            }`}
            disabled={currentSlide >= filteredData.length - slidesToShow}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
