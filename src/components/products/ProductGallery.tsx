"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import type { ProductGalleryProps } from "@/types";

export default function ProductGallery({
  title,
  imageCover,
  images,
  price,
  priceAfterDiscount,
}: ProductGalleryProps) {
  const galleryImages =
    images && images.length > 0 ? images : imageCover ? [imageCover] : [];

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const discountPercent =
    priceAfterDiscount && priceAfterDiscount < price
      ? Math.round(((price - priceAfterDiscount) / price) * 100)
      : 0;

  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)]">
      {/* ── Main Showcase Slider ── */}
      <div className="relative aspect-11/15 w-full overflow-hidden rounded-lg bg-white">
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center rounded-md bg-[#fb2c36] px-2 py-1 text-xs leading-4 font-medium text-white">
              -{discountPercent}%
            </span>
          </div>
        )}

        <Swiper
          modules={[FreeMode, Navigation, Thumbs]}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          spaceBetween={10}
          speed={350}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-full w-full"
        >
          {galleryImages.map((imgUrl, idx) => (
            <SwiperSlide key={idx} className="relative flex h-full w-full items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgUrl}
                alt={`${title} ${idx + 1}`}
                className="h-full w-full object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Thumbnail Row ── */}
      {galleryImages.length > 1 && (
        <div className="mt-2">
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[FreeMode, Navigation, Thumbs]}
            spaceBetween={8}
            slidesPerView="auto"
            freeMode={true}
            watchSlidesProgress={true}
            className="w-full"
          >
            {galleryImages.map((imgUrl, idx) => {
              const isActive = activeIndex === idx;
              return (
                <SwiperSlide
                  key={idx}
                  className="h-20! w-16! shrink-0 cursor-pointer overflow-hidden rounded-md border-2 bg-white transition-all duration-200 sm:h-24! sm:w-20!"
                >
                  <div
                    className={`h-full w-full overflow-hidden rounded-sm border-2 transition-all duration-200 ${
                      isActive
                        ? "border-brand shadow-sm opacity-100"
                        : "border-transparent opacity-55 hover:opacity-90 hover:border-black/15"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgUrl}
                      alt={`${title} preview ${idx + 1}`}
                      className="pointer-events-none h-full w-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
}
