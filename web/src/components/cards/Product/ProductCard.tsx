import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardContent, Stack } from '@mui/material';
import CardProduct, { IImage } from '../ProductCardImage';
import RaffleDetailsCard from '../RaffleDetailsCard';
import ProductDetailsCard from '../ProductDetailsCard';
import Carrocel from '../../carrousels/CardCarrousel';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

export interface IProduct {
  name: string;
  price: number;
  isNew: boolean;
  url: string;
  details: string;
  images: IImage[];
}

export interface IRaffle {
  id: string;
  price: number;
  completionDate: string;
  numbersAvailable: number;
  products: IProduct[];
}

interface ICardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ICardProps) {
  const { images, ...rest } = product;
  return (
    <Grid2
      container
      spacing={2}
      sx={{
        alignItems: 'center',
        height: '100%',
        bgcolor: 'orange'
      }}
    >
      <Grid2 xs={9}>
        {/* implemnta para varios produtos */}
        <Carrocel images={images} />
      </Grid2>
      <Grid2 sx={{bgcolor:'yellow'}} xs={3}>
        <ProductDetailsCard product={rest} />
      </Grid2>
    </Grid2>
  );
}
