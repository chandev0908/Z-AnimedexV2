"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { AnimeCard } from "./AnimeCard";


type SelectorHook = () => any;
type ActionsHook = () => any;

export function AnimeList({
  AnimeListLabel,
  AnimeSelector,
  useActions,
  fetchOnMount,
}: {
  AnimeListLabel: string;
  AnimeSelector: SelectorHook;
  useActions: ActionsHook;
  fetchOnMount?: (actions: any) => Promise<void> | void;
}) {
  const selector = AnimeSelector();
  const {
    anime,
    results,
    seasonalAnime,
    loading,
    pagination,
    currentPage,
    error,
  } = selector;
  const list = anime ?? results ?? seasonalAnime ?? [];

  const actions = useActions();
  const { fetchTopAnime, fetchCurrentSeason, fetchSeasonalAnime } =
    actions || {};

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const getItemsPerView = () => {
    if (windowWidth < 640) return 2; // sm: phone
    if (windowWidth < 768) return 2; // md: small tablet
    if (windowWidth < 1024) return 3; // lg: tablet
    if (windowWidth < 1280) return 4; // xl: desktop
    return 5; // 2xl: large desktop
  };

  const itemsPerView = getItemsPerView();

  const maxIndex = Math.max(0, list.length - itemsPerView);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (fetchOnMount) {
      fetchOnMount(actions);
      return;
    }

    if (typeof fetchTopAnime === "function") {
      fetchTopAnime(1);
    } else if (typeof fetchCurrentSeason === "function") {
      fetchCurrentSeason();
    }
  }, []);

  useEffect(() => {
    // Reset carousel index when list changes
    setCarouselIndex(0);
  }, [list.length, itemsPerView]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY > 0 ? 1 : -1;
      setCarouselIndex((prev) => Math.max(0, Math.min(maxIndex, prev + delta)));
    };

    carousel.addEventListener("wheel", handleWheelEvent, { passive: false });
    return () =>
      carousel.removeEventListener("wheel", handleWheelEvent);
  }, [maxIndex]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error: {error}</p>
        <button
          onClick={() => {
            if (typeof fetchTopAnime === "function") fetchTopAnime(1);
            else if (typeof fetchCurrentSeason === "function")
              fetchCurrentSeason();
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  const progress = list.length > 0 ? (carouselIndex / maxIndex) * 100 : 0;

  const handleDrag = (event: any, info: any) => {
    // Prevent dragging beyond boundaries
    const maxDrag = 0;
    const minDrag = -(list.length - itemsPerView) * (carouselRef.current?.offsetWidth || 0) / itemsPerView;
    
    if (info.x > maxDrag || info.x < minDrag) {
      info.x = Math.max(minDrag, Math.min(maxDrag, info.x));
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    const swipe = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(velocity) > 500) {
      if (velocity < 0) {
        setCarouselIndex(Math.min(maxIndex, carouselIndex + 1));
      } else {
        setCarouselIndex(Math.max(0, carouselIndex - 1));
      }
    } else if (Math.abs(swipe) > swipeThreshold) {
      if (swipe < 0) {
        setCarouselIndex(Math.min(maxIndex, carouselIndex + 1));
      } else {
        setCarouselIndex(Math.max(0, carouselIndex - 1));
      }
    }
  };

  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newIndex = Math.round(percentage * maxIndex);
    setCarouselIndex(Math.max(0, Math.min(maxIndex, newIndex)));
  };

  const itemWidth = 100 / itemsPerView;

  // Calculate pixel-based offset instead of percentage
  const getCarouselOffset = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const itemPixelWidth = containerWidth / itemsPerView;
      return -carouselIndex * itemPixelWidth;
    }
    return 0;
  };

  const getDragConstraints = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const itemPixelWidth = containerWidth / itemsPerView;
      const maxScroll = -maxIndex * itemPixelWidth;
      return { left: maxScroll, right: 0 };
    }
    return { left: 0, right: 0 };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 font-sans">{AnimeListLabel}</h1>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative w-full overflow-hidden"
        style={{ pointerEvents: "auto" }}
      >
        {/* Carousel */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex gap-4 select-none"
            animate={{ x: getCarouselOffset() }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            drag="x"
            dragConstraints={getDragConstraints()}
            dragElastic={0.1}
            dragMomentum={true}
            onDragEnd={handleDragEnd}
            style={{ cursor: "grab" }}
          >
            {list.map((item: any, index: number) => (
              <motion.div
                key={`${item.mal_id ?? index}-${index}`}
                className="flex-shrink-0"
                style={{ width: `${itemWidth}%` }}
              >
                <AnimeCard anime={item} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="mt-6 w-full bg-gray-300 h-2 rounded-full cursor-pointer"
        onClick={handleProgressDrag}
      >
        <motion.div
          className="bg-blue-500 h-full rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}
