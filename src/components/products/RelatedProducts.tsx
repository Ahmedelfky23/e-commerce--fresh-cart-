"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "./ProductCard";
import type { RelatedProductsProps } from "@/types";

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!products || products.length === 0) return null;

  return (
    <section className="mt-18">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1.5 shrink-0 rounded-full bg-linear-to-b from-[#00bc7d] to-[#007a55]" />
          <h2 className="text-2xl leading-8 font-bold text-[#1e2939]">
            You May Also Like
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous products"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f3f4f6] text-[#4a5565] transition-colors hover:bg-[#e5e7eb] hover:text-[#101828]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next products"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f3f4f6] text-[#4a5565] transition-colors hover:bg-[#e5e7eb] hover:text-[#101828]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: {
            slidesPerView: 2.2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3.2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        className="w-full pb-2! items-stretch"
      >
        {products.map((item) => (
          <SwiperSlide key={item._id} className="!h-auto flex">
            <ProductCard product={item} imageClassName="h-60" className="w-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
