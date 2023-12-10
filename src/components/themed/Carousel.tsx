import React, { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../../context";

interface CarouselProps {
  children: ReactNode[];
}

const Carousel = ({ children }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      nextSlide();
    } else {
      prevSlide();
    }
  }, [user]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1) % children.length);
  };

  if (!children || children.length === 0) {
    return null;
  }
  return (
    <div className="relative overflow-hidden ">
      <div
        className="flex w-full transition-transform duration-300 ease-in-out transform translate-x-full "
        style={{
          width: `${children.length}00%`,

          transform: `translateX(-${currentIndex * 50}%)`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className="w-full">
            {child}
          </div>
        ))}
      </div>
      {/*  <button
        className="absolute left-0 px-2 py-4 text-white transform -translate-y-1/2 bg-gray-700 rounded-l top-1/2"
        onClick={prevSlide}
      >
        {"<"}
      </button>
      <button
        className="absolute right-0 px-2 py-4 text-white transform -translate-y-1/2 bg-gray-700 rounded-r top-1/2"
        onClick={nextSlide}
      >
        {">"}
      </button> */}
    </div>
  );
};

export default Carousel;
