import { Slider, Slide, SliderProps } from '../Slider';

import RaffleCard, { IRaffle } from '../cards/RaffleCard';
import Box from '@mui/material/Box';

interface CardSliderProps {
  raffles: IRaffle[];
}

export default function CardSlider({ raffles }: CardSliderProps) {
  const settings: SliderProps = {
    spaceBetween: 50,
    navigation: raffles.length >= 1,
    pagination: raffles.length >= 1 && {
      clickable: true,
    },
    draggable: raffles.length >= 1,
    loop: raffles.length >= 1,
    breakpoints: {
      300: {
        slidesPerView: 1,
        navigation: false,
        slidesPerGroup: 1,
      },
      800: {
        slidesPerView: raffles.length < 1 ? raffles.length : 1,
        slidesPerGroup: raffles.length < 1 ? raffles.length : 1,
      },
      1200: {
        slidesPerView: raffles.length < 1 ? raffles.length : 1,
        slidesPerGroup: raffles.length < 1 ? raffles.length : 1,
      },
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#FFFFFF',
      }}
    >
      {raffles.length === 1 ? (
        <RaffleCard raffle={raffles[0]} />
      ) : (
        <Slider settings={settings}>
          {raffles.map((raffle) => (
            <Slide key={raffle.id}>
              <RaffleCard raffle={raffle}></RaffleCard>
            </Slide>
          ))}
        </Slider>
      )}
    </Box>
  );
}
