'use client';

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const isMobile = typeof window !== 'undefined' && window.innerWidth < 780;

const responsive = {
  superLargeDesktop: {
    breakpoint: {max: 4000, min: 3000},
    items: 6,
  },
  desktop: {
    breakpoint: {max: 3000, min: 2000},
    items: 5,
  },
  middleDesktop: {
    breakpoint: {max: 2000, min: 1550},
    items: 4,
  },
  miniDesktop: {
    breakpoint: {max: 1550, min: 1200},
    items: 3,
  },
  tablet: {
    breakpoint: {max: 1200, min: 780},
    items: 2,
  },
  mobile: {
    breakpoint: {max: 780, min: 0},
    items: 1,
  },
};

type Props = {
  children: React.ReactNode;
  rightToLeft?: boolean;
};

export default function MultiCarousel({children, rightToLeft = true}: Props) {
  return (
    <Carousel
      infinite
      autoPlay
      autoPlaySpeed={isMobile ? 4000 : 1}
      transitionDuration={isMobile ? 2000 : 30000}
      customTransition={isMobile ? 'transform 2s ease-in-out' : 'transform 30s linear'}
      partialVisible
      responsive={responsive}
      containerClass="flex"
      itemClass="px-[8px] sm:px-[15px] mb-[10px]"
      rtl={rightToLeft}
      arrows={false}
      minimumTouchDrag={80}
      shouldResetAutoplay
    >
      {children}
    </Carousel>
  );
}
