import { ReactNode } from 'react';
import { Swiper, SwiperProps } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import './Slider.css';

interface SliderProps {
  settings: SwiperProps;
  children: ReactNode;
}

export default function Slider({ settings, children, ...props }: SliderProps) {
  return (
    <Swiper modules={[Navigation, Pagination, A11y, Autoplay]} {...settings} {...props}>
      {children}
    </Swiper>
  );
}
