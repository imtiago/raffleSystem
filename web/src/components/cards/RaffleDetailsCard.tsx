import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea, Stack } from '@mui/material';
import { IRaffle } from './RaffleCard';
import { useState } from 'react';
import TextField from '../../pages/modules/components/TextField';
import moment from 'moment';
import Swal from 'sweetalert2';
import { IRaffleSelected } from '../../pages/CheckoutPage/CheckoutPage';

export interface IRaffleProps {
  raffle: IRaffle;
  quantity?: number;
}

export default function RaffleDetailsCard({ raffle, quantity }: IRaffleProps) {
  // const [change, setChange] = useState<boolean>(false);
  const { id, price, completionDate } = raffle;

  function addRaffleMyCard(raffle: IRaffle) {
    console.log('irei adiciona no sessionStorage');
    const selectedRaffles: IRaffleSelected[] = JSON.parse(sessionStorage.getItem('selectedRaffles') as string);

    if (selectedRaffles.some(selectedRaffle=>selectedRaffle.id === raffle.id)) {
      Swal.fire({
        title: 'Atenção!',
        text: 'Este item já esta no seu Carrinho!',
        icon: 'warning',
      })
      return;
    }
    selectedRaffles.push({id,quantity: 1});
    sessionStorage.setItem('selectedRaffles', JSON.stringify(selectedRaffles));

    Swal.fire({
      title: 'Adicionado!',
      text: 'Adicionado com Sucesso!',
      icon: 'success',
    })
    // setChange(!change);
  }

  return (
    <Stack
      sx={{
        height: '100%',
        justifyContent: 'space-between',
        p: 5,
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h4" align="center">
          Dados do sorteio
        </Typography>
        <Typography>Valor: {price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Typography>
        <Typography>Data de Realização: {
        moment(completionDate).format('DD/MM/YYYY')
        }</Typography>
        <Typography>Hora Realização: {
        moment(completionDate).format('HH:mm')
        }</Typography>
      </Stack>
      {quantity ? (
        <Stack spacing={1}>
          <Typography>
            Valor Total: {(price * quantity).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </Typography>
        </Stack>
      ) : (
        <Button variant="contained" color="primary" onClick={() => addRaffleMyCard(raffle)}>
          Participar
        </Button>
      )}
    </Stack>
  );
}
