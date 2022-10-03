import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardProductModel3 from '../../components/cards/Product/CardProductModel3';
import mook_raffles from '../../_mock/raffles';
import { useCallback, useEffect, useState } from 'react';
import { IRaffle } from '../../components/cards/RaffleCard';
import RaffleDetailsCard from '../../components/cards/RaffleDetailsCard';
import { Button, Container, Stack, TextField } from '@mui/material';
import Page from '../../components/Page';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';
import { FormProvider } from '../../components/hook-form';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import CheckoutFooterBox from './CheckoutFooterBox';
import ShopProductCard from '../../sections/@dashboard/products/ProductCard';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useCart } from '../../context/CartContext';

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

interface IRaffleProps {
  raffle: IRaffle;
  quantity: number;
}
interface IListRafflesSelected extends IRaffle {
  quantity: number;
}

export default function CheckoutPage() {
  // const [raffles, setRaffles] = useState<IRaffle[]>([]);
  const navigate = useNavigate();
  const { isLogeed } = useAuth();
  const { cart, updateCart, handleSubmit } = useCart();

  const deleteCartRaffle = (raffle) => {
    const newCart = cart.filter((cartRaffle) => cartRaffle.raffle.id !== raffle.id);
    updateCart(newCart);
  };

  const updateQuantityRaffle = (event, raffle) => {
    const value = event.target.value;
    if (value.length > 0) {
      let update = false;
      const newCart = cart.map((cartRaffle) => {
        if (cartRaffle.raffle.id === raffle.id) {
          if (cartRaffle.quantity !== parseInt(value)) {
            cartRaffle.quantity = parseInt(value);
            update = true;
          }
        }
        return cartRaffle;
      });
      if (update) updateCart(newCart);
    }
  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();

    if (!isLogeed) {
      Swal.fire({
        text: 'Você precisa está logado para realizar essa operação, Realize o login ou cadastre-se para prosseguir',
        icon: 'warning',
      });
      navigate('/signIn');
      return;
    }
    handleSubmit();
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const selectedRafflesIds = cart.map((cartRaffle) => cartRaffle.raffle.id);
  //       // const list = await api.post('/rafflesIds', { rafflesIds: selectedRafflesIds });
  //       // const newcart = cart.map((cartRaffle) => {
  //       //   list.data.forEach(raffle=>{
  //       //     if(raffle.id === cartRaffle.raffle.id) {
  //       //   });
  //       // });
  //       // const selectedRaffles: IRaffleSelected[] = JSON.parse(sessionStorage.getItem('selectedRaffles') as string);
  //       // console.log(rafflesSelected)
  //       // const selectedRafflesIds = rafflesSelected.map((selectedRaffle) => selectedRaffle.id);
  //       // // const t = rafflesSelected.
  //       // // console.log(rafflesSelected.)
  //       // console.log(list);
  //       // const listFormated = list.data.map((d) => {
  //       //   return {
  //       //     ...d,
  //       //     ...rafflesSelected.find((r) => r.id === d.id),
  //       //   };
  //       // });
  //       // setListRafflesSelected(listFormated);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <Container>
      <form>
        <Grid container spacing={2}>
          <Alert severity="warning" variant="filled" sx={{ position: 'fixed', right: '0' }}>
            <AlertTitle>Atenção</AlertTitle>
            So aceitamos pagamentos através do <strong>PIX</strong>
          </Alert>
          {cart.length === 0 ? (
            <Grid xs={6} md={8}>
              Nenhum item no carrinho
            </Grid>
          ) : (
            cart.map((cartRaffle, index) => {
              const { raffle, quantity } = cartRaffle;
              return (
                <Grid container key={raffle.id} xs={6} md={8} justifyContent="space-between">
                  <Grid container spacing={3}>
                    {raffle.products.map((product) => (
                      <Grid key={product.id}>
                        <ShopProductCard product={product} />
                      </Grid>
                    ))}
                  </Grid>

                  <Grid xs={6} md={4}>
                    <RaffleDetailsCard raffle={raffle} />
                    <Stack spacing={1}>
                      <TextField
                        label="quantidade"
                        type="number"
                        defaultValue={quantity}
                        onBlur={(event) => updateQuantityRaffle(event, raffle)}
                      />
                      <Button variant="outlined" color="primary" size="small" onClick={() => deleteCartRaffle(raffle)}>
                        Delete
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              );
            })
          )}
        </Grid>
        <Grid xs={6} md={4}>
          <CheckoutFooterBox handleFunc={onHandleSubmit} />
        </Grid>
      </form>
    </Container>
  );
}
