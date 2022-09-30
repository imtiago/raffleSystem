import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { IRaffle } from './RaffleCard';
import { useCart } from '../../context/CartContext';

export interface IRaffleProps {
  raffle: IRaffle;
}

export default function RaffleDetailsCardOptions({ raffle }: IRaffleProps) {
  const { addRaffleToCart } = useCart();
  return (
    <Stack spacing={1}>
      <Button variant="contained" color="primary" onClick={() => addRaffleToCart(raffle)}>
        Participar
      </Button>
    </Stack>
  );
}
