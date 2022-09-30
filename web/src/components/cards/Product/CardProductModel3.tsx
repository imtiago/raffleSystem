import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import { IProduct } from './ProductCard';
import Img from '../../Img/Img';

interface ICardProps {
  product: IProduct;
}
export default function CardProductModel3({ product }: ICardProps) {
  const { name, images } = product;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Box
          sx={{
            pt: '100%',
            position: 'relative',
          }}
        >
          <Img src={images[0].url} alt={images[0].name} />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
