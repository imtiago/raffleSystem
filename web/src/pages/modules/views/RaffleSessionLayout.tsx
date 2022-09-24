import * as React from 'react';
import { Theme, styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardProduct from '../../../components/cards/ProductCardImage';
import RaffleCard, { IRaffle } from '../../../components/cards/RaffleCard';
import RafflesCarrocel from '../../../components/carrousels/RafflesCarrousel';


const mookCard = {
  name:"iphone",
  price: 300,
  isNew: true,
  url: 'https://img.freepik.com/free-photo/medium-shot-man-filling-papers_23-2148943308.jpg?w=740&t=st=1663805365~exp=1663805965~hmac=677c55b2f9360b9d8512caf6fb5e17914e3718029f7bed6942bcee5101de91c4'
}



const cards_carrousel = [
  {
    price: 10,
    drawDate: "30/11/2022",
    product:{
      id: '1',
      name : "Iphone 12",
      price: 8000,
      isNew: true,
      details: "Iphone 12 preto",
      images:[
        "https://img.freepik.com/premium-photo/all-screen-blank-smartphone-mockup-isolated-black-3d-render_118047-1785.jpg?w=740",
        "https://img.freepik.com/free-vector/smartphone-with-gradient-wallpaper_23-2147849866.jpg?w=826&t=st=1663814284~exp=1663814884~hmac=9fe6bcbc25a9e2c0b1ddaef36056acdf8cf8aa0cecc6abc78043a8ba8584a735",
        "https://img.freepik.com/free-vector/smartphone-with-gradient-wallpaper_23-2147843160.jpg?w=826&t=st=1663814318~exp=1663814918~hmac=11a5d14aa9d1a16c37f7b80d58e1b390bde3ecfb75cf173a9569974c446d620d",
      ]
    }
  },
  {
    price: 20,
    drawDate: "30/11/2022",
    product:{
      id: '2',
      name : "moto",
      price: 18000,
      isNew: true,
      details: "Uma motoca Top",
      images:[
        "https://img.freepik.com/premium-psd/isolated-black-sport-bike-from-left-front-view_16145-349.jpg?w=1380",
        "https://img.freepik.com/free-vector/red-color-motorcycle-isolated-white-background_1284-38725.jpg?w=996&t=st=1663814401~exp=1663815001~hmac=a9af4be83cf0d2abb120e45b2e0f34ff755dfc910141d710b2a087660c65bb92",
        "https://img.freepik.com/premium-psd/isolated-white-sport-bike-from-left-front-view_16145-365.jpg?w=1380"
      ]
    }
  },
  {
    price: 50,
    drawDate: "30/11/2022",
    product:{
      id: '3',
      name : "carro",
      price: 40000,
      isNew: false,
      details: "honda Civic",
      images:[
        "https://img.freepik.com/premium-photo/compact-sports-car-family-sedan-3d-illustration_101266-13581.jpg?w=1480",
        "https://img.freepik.com/premium-photo/blue-family-innovative-electric-suv-car-white-background-3d-rendering_101266-26688.jpg?w=1480"
      ]
    }
  }
]


const RaffleSessionLayoutRoot = styled('section')(({ theme }) => ({
  color: theme.palette.common.white,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    height: '80vh',
    minHeight: 500,
    maxHeight: 1300,
  },
}));

interface ProductHeroLayoutProps {
  sxBackground: SxProps<Theme>;
}

export default function RaffleSessionLayout(
  // raffles: IRaffle[],
  props: React.HTMLAttributes<HTMLDivElement> & ProductHeroLayoutProps,
) {
  const { sxBackground, children } = props;

  return (
    <RaffleSessionLayoutRoot>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <RafflesCarrocel raffles={cards_carrousel}/>
        {children}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'common.black',
            opacity: 0.5,
            zIndex: -1,
          }}
        />
      </Container>
    </RaffleSessionLayoutRoot>
  );
}
