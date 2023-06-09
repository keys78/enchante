import { useState, useEffect, useRef } from "react";

interface Slide {
  image: string;
}

interface SlideshowProps {
  slides: Slide[];
}

const delay = 6000;

export default function Slideshow({ slides }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [index, slides.length]);

  return (
    <>
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {slides.map((data, index) => {
            return (
              <div className="slide" key={index}>
                <img src={data.image} alt="slide" />
              </div>
            );
          })}
        </div>

        <div className="slideshowDots">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
