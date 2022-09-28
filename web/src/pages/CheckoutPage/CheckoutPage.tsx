import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import CardProductModel3 from '../../components/cards/Product/CardProductModel3';
import mook_raffles from '../../_mock/raffles';
import { useCallback, useEffect, useState } from 'react';
import { IRaffle } from '../../components/cards/RaffleCard';
import RaffleDetailsCard from '../../components/cards/RaffleDetailsCard';
import { Button, Container, Stack, TextField } from '@mui/material';
import Page from '../../components/Page';
import Typography from '../../theme/overrides/Typography';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';
import { FormProvider } from '../../components/hook-form';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export interface IRaffleSelected {
  id: string;
  quantity: number;
}

interface IRaffleProps {
  raffle: IRaffle;
  quantity: number;
}
interface IListRafflesSelected extends IRaffle {
  quantity: number;
}

export default function FullWidthGrid() {
  // const [raffles, setRaffles] = useState<IRaffle[]>([]);
  const navigate = useNavigate();
  const { userLogged } = useAuth();
  const [listRafflesSelected, setListRafflesSelected] = useState<IListRafflesSelected[]>([]);
  const [rafflesSelected, setRafflesSelected] = useState<IRaffleSelected[]>(
    () => JSON.parse(sessionStorage.getItem('selectedRaffles') as string) as IRaffleSelected[]
  );

  const getItensLocalHistory = useCallback(() => {
    console.log('estou sendo executada');
    //     remove(index)

    // console.log(index)
    // console.log(fields)
    // console.log(raffle)
  }, []);

  // const fetchData = useCallback()
  const deleteItemLocalHistory = (raffle) => {
    const selectedRaffles: IRaffleSelected[] = JSON.parse(sessionStorage.getItem('selectedRaffles') as string);
    const newSelectedRaffles = selectedRaffles.filter((selectedRaffle) => selectedRaffle.id !== raffle.id);
    const newListRafflesSelected = listRafflesSelected.filter((selectedRaffle) => selectedRaffle.id !== raffle.id);
    sessionStorage.setItem('selectedRaffles', JSON.stringify(newSelectedRaffles));
    setListRafflesSelected(newListRafflesSelected);
  };

  const updateQuantityRaffle = (event, raffle) => {
    const value = event.target.value;
    if (value.length > 0) {
      const selectedRaffles: IRaffleSelected[] = JSON.parse(sessionStorage.getItem('selectedRaffles') as string);
      const index = selectedRaffles.findIndex((selectedRaffle) => selectedRaffle.id === raffle.id);
      selectedRaffles[index].quantity = parseInt(value);

      console.log(selectedRaffles);
      sessionStorage.setItem('selectedRaffles', JSON.stringify(selectedRaffles));
    }
    console.log(event.target.value.length);
    // console.log(raffle)

    // const selectedRaffles: IRaffleSelected[] = JSON.parse(sessionStorage.getItem('selectedRaffles') as string);
    // const newSelectedRaffles = selectedRaffles.filter(selectedRaffle => selectedRaffle.id !== raffle.id)
    // const newListRafflesSelected = listRafflesSelected.filter(selectedRaffle => selectedRaffle.id !== raffle.id)
    // sessionStorage.setItem('selectedRaffles',JSON.stringify(newSelectedRaffles));
    // setListRafflesSelected(newListRafflesSelected)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const selectedRaffles: IRaffleSelected[] = JSON.parse(sessionStorage.getItem('selectedRaffles') as string);

        // console.log(rafflesSelected)

        const selectedRafflesIds = rafflesSelected.map((selectedRaffle) => selectedRaffle.id);
        // const t = rafflesSelected.
        // console.log(rafflesSelected.)
        const list = await api.post('/rafflesIds', { rafflesIds: selectedRafflesIds });
        const listFormated = list.data.map((d) => {
          return {
            ...d,
            ...rafflesSelected.find((r) => r.id === d.id),
          };
        });
        setListRafflesSelected(listFormated);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userLogged()) {
      Swal.fire({
        text: 'Você precisa está logado para realizar essa operação, Realize o login ou cadastre-se para prosseguir',
        icon: 'warning',
      });
      navigate('/signIn');
      return;
    }

    const selectedRaffles: IRaffleSelected[] = JSON.parse(sessionStorage.getItem('selectedRaffles') as string);

    try {
      const response = await api.post('/orders', {
        selectedRaffles: selectedRaffles,
      });
      Swal.fire({
        text: 'Pedido realizado com sucesso',
        icon: 'success',
      });
      sessionStorage.setItem('selectedRaffles', JSON.stringify([]));
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Page title="CheckOut">
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <form>
            <Grid container spacing={2}>
              {listRafflesSelected.length === 0 ? (
                <Grid>
                  {' '}
                  <Grid xs={6} md={8}>
                    Nenhum item no carrinho
                  </Grid>{' '}
                </Grid>
              ) : (
                listRafflesSelected.map((item, index) => (
                  <Grid key={item.id} xs={6} md={8}>
                    <Grid container spacing={2}>
                      {item.products.map((product) => (
                        <Grid key={product.id} xs={6} md={8}>
                          <CardProductModel3 product={product} />
                        </Grid>
                      ))}

                      <Grid xs={6} md={4}>
                        <RaffleDetailsCard raffle={item} />
                        <Stack spacing={1}>
                          <TextField
                            label="quantidade"
                            type="number"
                            defaultValue={item.quantity}
                            onBlur={(event) => updateQuantityRaffle(event, item)}
                          />
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => deleteItemLocalHistory(item)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              )}
              <Grid xs={6} md={4}>
                {/* <Typography> */}
                ola
                {/* Valor Total: {(price * quantity).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} */}
                {/* </Typography> */}
                <Button type="submit" variant="contained" onClick={(event) => handleSubmit(event)}>
                  Concluir pagamento
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Page>
  );
}
