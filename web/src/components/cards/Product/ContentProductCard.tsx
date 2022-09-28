import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardContent, Stack } from '@mui/material';
import CardProduct, { IImage } from '../ProductCardImage';
import RaffleDetailsCard from '../RaffleDetailsCard';
import ProductDetailsCard from '../ProductDetailsCard';
import Carrocel from '../../carrousels/CardCarrousel';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import ProductCard, { IProduct } from './ProductCard';
import { useEffect } from 'react';

interface ICardProps {
  products: IProduct[];
}

export default function ContentProductCard({ products }: ICardProps) {
  let allImages: IImage[] = [];
  
  if (products.length === 1)  
  allImages = products[0].images;
  else{
    products.forEach((product) => {
      allImages = [...allImages, ...product.images];
    });
  }

  return (
    <Grid2
      container
      sx={{
        // alignItems: 'center',
        // width: '100%',
        // height: '100%',
        // borderRadius: '50%',
      }}
    >
      <Grid2
        xs={8}
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Carrocel images={allImages} />
      </Grid2>
      <Grid2
        xs={4}
        sx={{
          // height: '100%',
          // backgroundColor: 'yellow',
          // borderRadius: '50%',
          // marginLeft: '1px',
        }}
      >
        <Stack>
          {products.map((product) => {
            return <ProductDetailsCard key={product.id} product={product} />;
          })}
        </Stack>
      </Grid2>
    </Grid2>
  );
}
