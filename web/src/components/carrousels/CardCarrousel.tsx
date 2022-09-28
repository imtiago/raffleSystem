// import { Center } from '@chakra-ui/react';
// import { CardType, Card } from '../card/Card';
import { Slider, Slide, SliderProps } from '../Slider';

import CardProductImage, { IImage } from '../cards/ProductCardImage';

interface CardSliderProps {
  images: IImage[];
}

export default function CardSlider({ images }: CardSliderProps) {
  const settings: SliderProps = {
    // spaceBetween: 50,
    // navigation: images.length >= 1,
    // pagination: images.length >= 1 && {
    //   clickable: true,
    // },
    draggable: images.length >= 1,
    loop: images.length >= 1,
    autoplay: {
      delay: 6000,
      // disableOnInteraction: false,
    },
    // breakpoints: {
    //   300: {
    //     slidesPerView: 1,
    //     navigation: false,
    //     slidesPerGroup: 1,
    //   },
    //   800: {
    //     slidesPerView: images.length < 1 ? images.length : 1,
    //     slidesPerGroup: images.length < 1 ? images.length : 1,
    //   },
    //   1200: {
    //     slidesPerView: images.length < 1 ? images.length : 1,
    //     slidesPerGroup: images.length < 1 ? images.length : 1,
    //   },
    // },
  };

  return (
    <>
      {images.length === 1 ? (
        <CardProductImage image={images[0]} />
      ) : (
        <Slider settings={settings}>
          {images.map((image) => (
            <Slide key={image.id} >
              <CardProductImage image={image} />
            </Slide>
          ))}
        </Slider>
      )}
    </>
  );
}
