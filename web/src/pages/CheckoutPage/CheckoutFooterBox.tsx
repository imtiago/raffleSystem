import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Stack } from '@mui/material';
import PixIcon from '@mui/icons-material/Pix';
import { useCart } from '../../context/CartContext';
import { useCallback, useEffect, useState } from 'react';

interface CheckoutFooterProps {
  handleFunc: (event) => void;
}
export default function CheckoutFooter({ handleFunc }: CheckoutFooterProps) {
  const { cart } = useCart();
  const [totalValue, setTotalValue] = useState(0);

  const initValue = useCallback(() => {
    const value = cart.reduce((prevValue, cartRaffle) => prevValue + cartRaffle.raffle.price * cartRaffle.quantity, 0);
    setTotalValue(value);
  }, []);

  useEffect(() => {
    initValue();
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      // width={'100%'}
      p={3}
      borderRadius={2}
      bgcolor="rgba(0, 0, 0, 0.1)"
    >
      <Stack>
        <Typography>
          <strong>Quantidade de itens:</strong> {cart.length}
        </Typography>
        <Typography>
          <strong>Valor Total:</strong> {totalValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </Typography>
      </Stack>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        startIcon={<PixIcon />}
        onClick={(event) => handleFunc(event)}
        disabled={cart.length === 0 ? true : false}
      >
        Concluir pagamento
      </Button>
    </Box>
  );
}
