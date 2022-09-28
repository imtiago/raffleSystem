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
    <Stack spacing={1} pt={5} pl={2}
    borderRadius={4}
    >
      <Typography variant="h4" align="center">
        {name}
      </Typography>
      <Typography variant="h5">
        <strong>Valor:</strong> {price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
      </Typography>
      <Typography variant="h5">
      <strong>Estado:</strong> {isNew ? 'Produto Novo' : 'Produto Usado'}
      </Typography>
      <Typography variant="h5">
      <strong>Detalhes:</strong> {details}
      </Typography>
    </Stack>
  );
}
