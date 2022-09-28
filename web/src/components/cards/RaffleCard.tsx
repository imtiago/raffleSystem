import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardContent, Stack } from '@mui/material';
import CardProduct, { IImage } from './ProductCardImage';
import RaffleDetailsCard from './RaffleDetailsCard';
import RaffleDetailsCardOptions from './RaffleDetailsCardOptions';
import ProductDetailsCard from './ProductDetailsCard';
import Carrocel from '../carrousels/CardCarrousel';
import ProductCard, { IProduct } from './Product/ProductCard';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import ContentProductCard from './Product/ContentProductCard';

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
  const { products, ...raflleDetails } = raffle;
  return (
    <Grid2
      container
      // spacing={2}
      sx={{
        // alignItems: 'center',
        // width: '98%',
        // height: '98%',
        // color: 'black',
        borderRadius: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      }}
    >
      <Grid2
        xs={9}
        sx={
          {
            // display: 'flex',
            // alignItems: 'center',
            // height: '100%',
            // backgroundColor: 'yellow',
          }
        }
      >
        <ContentProductCard products={raffle.products} />
        {/* <ProductCard product={raffle.products[0]} /> */}
      </Grid2>
      
      <Grid2
        xs={3}
        sx={{
        //   // flex: 1,
          height: '100%',
          // bgcolor: 'red',
        //   display: 'flex',
        //   alignItems: 'space-between',
        //   direction: 'column',
        //   // direction: 'c',
        //   // justifyContent: 'center',
        //   // justifyContent: 'space-between',
        //   // p: 5,
        }}
      >
        <div>
          fhkjdshfkj  
        </div>
        {/* <Box
        sx={{
          // flex: 1,
          height: '100%',
          bgcolor: 'red',
          display: 'flex',
          // alignItems: 'space-between',
          // direction: 'column',
          // direction: 'c',
          // justifyContent: 'center',
          justifyContent: 'space-between',
          // p: 5,
        }}
        >

        <RaffleDetailsCard raffle={raffle} />
        <RaffleDetailsCardOptions raffle={raffle} />
        </Box> */}
      </Grid2>
    </Grid2>
  );
}
