import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea, Stack } from '@mui/material';

export interface IRaffleProps {
  price: number;
  completionDate: string;
}

export default function RaffleDetailsCard({ price, completionDate }: IRaffleProps) {
  return (
    <Stack 
    // sx={{ height: 500, justifyContent:'space-between'}} 
    spacing={1} alignContent="top" bgcolor="red">
      <Stack>
        <Typography variant="h5" align="center">
          Dados do sorteio
        </Typography>
        <Typography>Valor: {price}</Typography>
        <Typography>Data de Realização: {completionDate}</Typography>
      </Stack>
      <Button variant="contained" color="primary">
        Participar
      </Button>
    </Stack>
  );
}
