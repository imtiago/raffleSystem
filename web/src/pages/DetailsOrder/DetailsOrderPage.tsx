import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardProductModel3 from '../../components/cards/Product/CardProductModel3';
import mook_raffles from '../../_mock/raffles';
import { useCallback, useEffect, useState } from 'react';
// import { IRaffle } from '../../components/cards/RaffleCard';
import RaffleDetailsCard from '../../components/cards/RaffleDetailsCard';
import { Button, Container, Stack, TextField } from '@mui/material';
import Page from '../../components/Page';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';
import { FormProvider } from '../../components/hook-form';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import CheckoutFooterBox from './DetailsOrderHeader';
import ShopProductCard from '../../sections/@dashboard/products/ProductCard';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useCart } from '../../context/CartContext';
import DetailsOrderHeader from './DetailsOrderHeader';
import Toast from '../../components/Toast';
import moment from 'moment';
import { EnumStatusOrder, EnumStatusRaffle } from '../../utils/Enums';
import { IRaffle } from '../../utils/interfaces';
import { fCurrency1 } from '../../utils/formatNumber';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// export interface IRaffleSelected {
//   id: string;
//   quantity: number;
// }

interface ITicket {
  id: string;
  code: string;
}
interface IOrder {
  id: string;
  code: string;
  status: string;
  value: number;
  createdAt: Date;
  tickets?: ITicket[];
  raffles: IRaffle[];
}

export default function DetailsOrderPage() {
  const [order, setOrder] = useState<IOrder>();
  // const [orderCode, setOrderCode] = useState<string>('');

  const getOrder = useCallback(async (orderCode: string) => {
    if (orderCode.length === 7) {
      const response = await api.get(`/orders/${orderCode}`);
      const order = response.data;
      if (!order)
        Toast.fire({
          icon: 'error',
          title: 'Order não encontrada!',
        });

      setOrder(order);
    }
  }, []);

  // useEffect(() => {
  //   if (orderCode.length > 0) getOrder(orderCode);
  // }, []);

  return (
    <Container>
      <Grid xs={6} md={4}>
        <DetailsOrderHeader searchFunc={getOrder} />
      </Grid>
      {order && (
        <Stack border={1} borderRadius={2} mt={2} spacing={1} p={2}>
          <Typography variant="h4" align="center">
            {'Dados da Order'}
          </Typography>
          {/* <Stack> */}
          <Typography>
            <strong>Numero de Order: </strong> {order?.code}
          </Typography>
          <Typography>
            <strong>Valor Total: </strong> {order?.value ? fCurrency1(order?.value) : ''}
          </Typography>
          {/* </Stack> */}
          {/* <Stack> */}
          <Typography>
            <strong>Status: </strong> {order?.status ? EnumStatusOrder[order.status].label : ''}
          </Typography>
          <Typography>
            <strong>Data de Realização: </strong>
            {order.createdAt ? moment(order.createdAt).format('DD/MM/YYYY') : ''}
          </Typography>
          {/* <Stack>
          {order.raffles?.map((raffle) => {
            const { price, completionDate, status } = raffle;
            return (
              <Stack>
                <Typography>
                  <strong>Valor Total: </strong> {fCurrency1(price)}
                </Typography>
                <Typography>
                  <strong>Status: </strong> {status}
                </Typography>
                <Typography>
                  <strong>Datos da Realização</strong>
                </Typography>
                <Typography>
                  <strong>Data: </strong>
                  {completionDate ? moment(completionDate).format('DD/MM/YYYY') : ''}
                </Typography>
                <Typography>
                  <strong>Hora: </strong>
                  {completionDate ? moment(completionDate).format('hh:mm') : ''}
                </Typography>
              </Stack>
            );
          })}
        </Stack> */}
          {/* <Stack>
          {order.tickets?.map((ticket) => {
            const { code } = ticket;
            return (
              <Stack>
                <Typography>
                  <strong>codigo do ticket: </strong> {code}
                </Typography>
              </Stack>
            );
          })}
        </Stack> */}
        </Stack>
      )}
    </Container>
  );
}
