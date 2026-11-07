"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import type { HeroSlide as Slide } from "@/types";

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "Fresh Products Delivered\nto your Door",
    subtitle: "Get 20% off your first order",
    ctaText: "Shop Now",
    ctaHref: "/products",
    secondaryCtaText: "View Deals",
    secondaryCtaHref: "/products",
    gradient: "from-[#00c950]/90 to-[#05df72]/50",
  },
  {
    id: 2,
    title: "Quality Everyday Essentials\nfor You",
    subtitle: "Free shipping on orders over 500 EGP",
    ctaText: "Explore Products",
    ctaHref: "/products",
    secondaryCtaText: "Browse Categories",
    secondaryCtaHref: "/categories",
    gradient: "from-[#16a34a]/90 to-[#22c55e]/60",
  },
  {
    id: 3,
    title: "Top Brands & Fresh Deals\nEvery Day",
    subtitle: "Up to 40% discount on selected groceries",
    ctaText: "See Offers",
    ctaHref: "/products",
    secondaryCtaText: "View Brands",
    secondaryCtaHref: "/brands",
    gradient: "from-[#15803d]/90 to-[#10b981]/60",
  },
];

export default function HeroBanner() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative h-100 w-full overflow-hidden hero-swiper-wrapper">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop={true}
        speed={700}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".hero-swiper-pagination",
          bulletClass: "hero-bullet",
          bulletActiveClass: "hero-bullet-active",
        }}
        className="h-full w-full"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full overflow-hidden">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/hero/hero-banner.png)" }}
              aria-hidden
            />

            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 bg-linear-to-r ${slide.gradient}`}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center">
              <div className="w-full px-8 md:ml-4 md:w-full md:max-w-214.25 md:px-0 md:pl-21.5 md:pr-8 xl:mx-auto xl:max-w-[1678px]">
                <div className="flex w-full flex-col gap-4 py-8.5">
                  <h2 className="max-w-105 text-[30px] leading-9 font-bold text-white whitespace-pre-line">
                    {slide.title}
                  </h2>
                  <p className="text-base leading-6 font-medium text-white">
                    {slide.subtitle}
                  </p>
                  <div className="flex items-center justify-center gap-2 md:justify-start">
                    <Link
                      href={slide.ctaHref}
                      className="rounded-lg border-2 border-white bg-white px-6 py-2 text-base leading-6 font-semibold text-[#00c950] transition-colors hover:bg-[#f0fdf4]"
                    >
                      {slide.ctaText}
                    </Link>
                    <Link
                      href={slide.secondaryCtaHref}
                      className="rounded-lg border-2 border-white px-6 py-2 text-base leading-6 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      {slide.secondaryCtaText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous Slide Button */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute top-1/2 left-4 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[#00c950] shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)] transition-transform hover:scale-105 active:scale-95 md:flex z-20"
      >
        <i className="fa-solid fa-chevron-left text-[16px]" aria-hidden />
      </button>

      {/* Next Slide Button */}
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute top-1/2 right-4 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[#00c950] shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)] transition-transform hover:scale-105 active:scale-95 md:flex z-20"
      >
        <i className="fa-solid fa-chevron-right text-[16px]" aria-hidden />
      </button>

      {/* Pagination container */}
      <div className="hero-swiper-pagination absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-2 pt-1.25 pb-1.75" />

      <style jsx global>{`
        .hero-bullet {
          display: inline-block;
          height: 12px;
          width: 12px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .hero-bullet:hover {
          background-color: #ffffff;
        }
        .hero-bullet-active {
          width: 32px;
          background-color: #ffffff;
        }
      `}</style>
    </section>
  );
}
