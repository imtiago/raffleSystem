import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardContent, Stack } from '@mui/material';
import CardProduct, { IImage } from './ProductCardImage';
import RaffleDetailsCard from './RaffleDetailsCard';
import ProductDetailsCard from './ProductDetailsCard';
import Carrocel from '../carrousels/CardCarrousel';
import ProductCard from './Product/ProductCard';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

export interface IProduct {
  id: string;
  name: string;
  price: number;
  isNew: boolean;
  url?: string;
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
  raffle: IRaffle;
}

export default function RaffleCard({ raffle }: ICardProps) {
  // export default function RaffleCard() {
  const { price, completionDate, numbersAvailable, products } = raffle;
  return (
    <Grid2 container spacing={2}
     sx={{
      alignItems: 'center',
      color: 'black'
    }}
     >
      <Grid2 xs={9}>
        {/* implemnta para varios produtos */}
        {/* <div>
          teste 
        </div> */}
        <ProductCard product={products[0]} />
      </Grid2>
      <Grid2 sx={{ height: 800, backgroundColor: 'blue'}} xs={3}>
        <RaffleDetailsCard completionDate={completionDate} price={price} />
      </Grid2>
    </Grid2>
  );
}
