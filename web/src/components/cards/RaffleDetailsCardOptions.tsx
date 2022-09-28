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

export default function RaffleDetailsCardOptions({ raffle }: IRaffleProps) {
  const { id, price, } = raffle;

  function addRaffleMyCard(raffle: IRaffle) {
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
  }

  return (
    <Stack spacing={1}>
      <Button variant="contained" color="primary" onClick={() => addRaffleMyCard(raffle)}>
        Participar
      </Button>
    </Stack>
  );
}
