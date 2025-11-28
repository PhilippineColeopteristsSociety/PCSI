import React, { useState, useRef, useEffect } from "react";
import { images } from "@/constants/images";
import Container from "@/components/common/Container";
import { videos } from "@/constants/video";

const heroSlides = [
  { type: "image", src: images.beatle_2 },
  { type: "video", src: videos.beatleVideo }, 
  { type: "image", src: images.beatle_3 },
  { type: "image", src: images.beatle_4 },
  { type: "image", src: images.beatle_5 },
  { type: "image", src: images.beatle_6 },
  { type: "image", src: images.beatle_7 },
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [zoomKeys, setZoomKeys] = useState([0, 1]);
  const timeoutRef = useRef();

  const nextIndex = (currentIndex + 1) % heroSlides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setZoomKeys(([, next]) => [next, next + 1]);

      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
        setZoomKeys(([, next]) => [next, next + 1]);
        setIsFading(false);
      }, 1000);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const renderSlide = (slide, key, visible) => {
    if (slide.type === "image") {
      return (
        <div
          key={key}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            animation: "zoomInHero 4s linear forwards",
          }}
        />
      );
    }
    if (slide.type === "video") {
      return (
        <video
          key={key}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          // style={{
          //   animation: "zoomInHero 4s linear forwards",
          // }}
        >
          <source src={slide.src} type="video/mp4" />
        </video>
      );
    }
  };

  return (
    <section className="relative h-[calc(100vh-300px)] lg:h-[calc(100vh-100px)] w-full overflow-hidden border-b-2 border-dark-green">
      {/* Slideshow background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {renderSlide(heroSlides[currentIndex], zoomKeys[0], !isFading)}
        {renderSlide(heroSlides[nextIndex], zoomKeys[1], isFading)}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30  z-0 pointer-events-none" />

      {/* Image Credits */}
      <div className="absolute bottom-4 right-4 z-10 bg-black/50 backdrop-blur-sm px-3 py-2 rounded text-white text-xs">
        <p className="opacity-80">
          Image credits{" "}
          <a
            href="https://www.facebook.com/markkineth.casindac"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-100 transition-opacity pointer-events-auto"
          >
            @Mark Kineth Casindac
          </a>
        </p>
      </div>

      {/* Content */}
      {/* <div className="relative z-20 flex h-full items-center justify-center">
        <Container className={"h-full py-8 md:py-0"}>
          <div className="h-full flex items-center ">
            <div className="flex flex-col gap-5 text-start">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-tight">
                Philippine <br /> Coleopterists Society <br /> Incorporated
              </h1>
            </div>
          </div>
        </Container>
      </div> */}
    </section>
  );
}

export default Hero;
