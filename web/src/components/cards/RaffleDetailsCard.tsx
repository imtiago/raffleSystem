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
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export default function RaffleDetailsCard({ raffle }: IRaffleProps) {
  // const [change, setChange] = useState<boolean>(false);
  const { id, price, completionDate } = raffle;

  function addRaffleMyCard(raffle: IRaffle) {
    console.log('irei adiciona no sessionStorage');
    const selectedRaffles: IRaffleSelected[] = JSON.parse(sessionStorage.getItem('selectedRaffles') as string);

    if (selectedRaffles.some((selectedRaffle) => selectedRaffle.id === raffle.id)) {
      Toast.fire({
        icon: 'warning',
        title: 'Este item já esta incluso no seu carrinho!',
      });
      return;
    }
    selectedRaffles.push({ id, quantity: 1 });
    sessionStorage.setItem('selectedRaffles', JSON.stringify(selectedRaffles));

    Toast.fire({
      icon: 'success',
      title: 'Adicionado com sucesso ao carrinho!',
    });
    // setChange(!change);
  }

  return (
      <Stack spacing={1}>
        <Typography variant="h4" align="center">
          Sorteio
        </Typography>
        <Typography>Valor: {price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Typography>
        <Typography>Data de Realização: {moment(completionDate).format('DD/MM/YYYY')}</Typography>
        <Typography>Hora Realização: {moment(completionDate).format('HH:mm')}</Typography>
      </Stack>
  );
}
