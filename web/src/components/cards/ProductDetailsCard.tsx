import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea, Stack } from '@mui/material';

export interface ICard {
  name: string;
  price: number;
  isNew: boolean;
  details: string;
}

interface ICardProps {
  product: ICard;
}

export default function ProductDetailsCard({ product }: ICardProps) {
  const { name, isNew, price, details } = product;
  return (
    <Stack spacing={1} sx={{bgcolor:'red'}}>
      <Typography variant="h4" align="center">
        {name}
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Valor: {price}
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Estado: {isNew ? 'Produto Novo' : 'Produto Usado'}
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Detalhes: {details}
      </Typography>
    </Stack>
  );
}
