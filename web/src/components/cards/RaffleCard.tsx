import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardContent, Stack } from '@mui/material';
import CardProduct, { IImage } from './ProductCardImage';
import RaffleDetailsCard from './RaffleDetailsCard';
import ProductDetailsCard from './ProductDetailsCard';
import Carrocel from '../carrousels/CardCarrousel';
import ProductCard, { IProduct } from './Product/ProductCard';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

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
  const { products } = raffle;
  return (
    <Grid2
      container
      // spacing={2}
      sx={{
        alignItems: 'center',
        width: '98%',
        height: '98%',
        color: 'black',
      }}
    >
      <Grid2
        xs={9}
        sx={
          {
            display: 'flex',
            // flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'center',
            // width: '100%',
            height: '100%',
            // color: 'black',
            // bgcolor: 'black',
            // width: '100%',
          }
        }
      >
        {/* implemnta para varios produtos */}
        {/* <div style={{ backgroundColor: 'red' }}>teste div 1</div> */}
        <ProductCard product={products[0]} />
      </Grid2>
      
      <Grid2
        xs={3}
        sx={{
          height: '100%',
        }}
      >
        <RaffleDetailsCard raffle={raffle} />
      </Grid2>
    </Grid2>
  );
}
