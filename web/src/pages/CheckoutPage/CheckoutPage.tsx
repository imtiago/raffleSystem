import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import CardProductModel3 from '../../components/cards/Product/CardProductModel3';
import mook_raffles from '../../_mock/raffles';
import { useCallback, useEffect, useState } from 'react';
import { IRaffle } from '../../components/cards/RaffleCard';
import RaffleDetailsCard from '../../components/cards/RaffleDetailsCard';
import { Button, Container, Stack } from '@mui/material';
import Page from '../../components/Page';
import Typography from '../../theme/overrides/Typography';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';
import { FormProvider } from '../../components/hook-form';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const quantity = 3;

interface IRaffleProps {
  raffle: IRaffle;
  quantity: number;
}

type FormValues = {
  selectedRaffles: IRaffleProps[];
};

export default function FullWidthGrid() {
  // const [raffles, setRaffles] = useState<IRaffle[]>([]);
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    mode: 'onBlur',
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const { fields, remove } = useFieldArray({
    name: 'selectedRaffles',
    control,
  });

  // const fetchData = useCallback()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const selectedRaffles: string[] = JSON.parse(localStorage.getItem('selectedRaffles') as string);
        // const list = await api.post('/rafflesIds',{rafflesIds:selectedRaffles});
        // const selectedRafflesList = list.data.map((s) => {
          const selectedRafflesList = mook_raffles.map((s) => {
          return {
            raffle: s,
            quantity: 1,
          };
        });
        // setRaffles(mook_raffles);
        reset({ selectedRaffles: selectedRafflesList });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data: FormValues) => {
    // console.log(data)
    const seectedRafflesToSendFormat = {
      selectedRaffles: data.selectedRaffles.map((r) => {
        return {
          id: r.raffle.id,
          quantity,
        };
      }),
    };
    try {
      const response = await api.post('/orders', seectedRafflesToSendFormat);
      console.log(response);
    } catch (error) {
      alert("você não esta logado, realize o login ou cadastre-se para completar a operação")
      navigate('/signIn', { replace: true });

      // console.log("ola");
      // console.log(error);
    }
  };

  return (
    <Page title="CheckOut">
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {fields.length === 0 ? (
                <Grid>
                  {' '}
                  <Grid xs={6} md={8}>
                    Nenhum item no carrinho
                  </Grid>{' '}
                </Grid>
              ) : (
                fields.map((item, index) => (
                  <Grid key={item.id} xs={6} md={8} {...register(`selectedRaffles.${index}.raffle.id`)}>
                    <Grid container spacing={2}>
                      {item.raffle.products.map((product) => (
                        <Grid key={product.id} xs={6} md={8}>
                          <CardProductModel3 product={product} />
                        </Grid>
                      ))}

                      <Grid xs={6} md={4}>
                        <RaffleDetailsCard raffle={item.raffle} quantity={quantity} />
                        <Stack>
                          <input
                            placeholder="quantity"
                            type="number"
                            {...register(`selectedRaffles.${index}.quantity` as const, {
                              valueAsNumber: true,
                              // required: true,
                            })}
                            defaultValue={item.quantity}
                          />
                          <Button variant="outlined" color="primary" size="small" onClick={() => remove(index)}>
                            Delete
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              )}
              <Grid xs={6} md={4}>
                <Button type="submit" variant="contained">
                  Concluir pagamento
                </Button>
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      </Container>
    </Page>
  );
}
