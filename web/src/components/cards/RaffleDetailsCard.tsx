import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea, Stack } from '@mui/material';
import { IRaffle } from './RaffleCard';
import { useState } from 'react';
import TextField from '../../pages/modules/components/TextField';
import moment from 'moment';

export interface IRaffleProps {
  raffle: IRaffle;
  quantity?: number;
}

export default function RaffleDetailsCard({ raffle, quantity }: IRaffleProps) {
  const [change, setChange] = useState<boolean>(false);
  const { id, price, completionDate } = raffle;

  function addRaffleMyCard(raffle: IRaffle) {
    console.log('irei adiciona no localstorage');
    const selectedRaffles: string[] = JSON.parse(localStorage.getItem('selectedRaffles') as string);

    if (selectedRaffles.includes(raffle.id)) {
      alert('item ja adicionado no carrinho');
      return;
    }
    // for(let i = 0; i < selectedRaffles.length; i++){
    //   if(selectedRaffles[i] === raffle.id){
    //     alert('item ja adicionado no carrinho')
    //     return
    //   }
    // }
    selectedRaffles.push(id);
    localStorage.setItem('selectedRaffles', JSON.stringify(selectedRaffles));

    alert('adicionado com sucesso');
    setChange(!change);
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
