import { useEffect, useState } from 'react';
import api from '../../../services/api';
import { Theme, styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import RafflesCarrocel from '../../../components/carrousels/RafflesCarrousel';
import { IRaffle } from '../../../components/cards/RaffleCard';
import mook_raffles from '../../../_mock/raffles';

const RaffleSessionLayoutRoot = styled('section')(({ theme }) => ({
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'gray',
  color: theme.palette.common.white,
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    height: '80vh',
    minHeight: 500,
    maxHeight: 1300,
  },
}));

interface ProductHeroLayoutProps {
  sxBackground: SxProps<Theme>;
}

export default function Index() {
  // const { sxBackground, children } = props;

  const [raffles, setRaffles] = useState<IRaffle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const list = await api.get('/raffles');
        // console.log(list.data)
        // setRaffles(list.data);
        setRaffles(mook_raffles);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <RaffleSessionLayoutRoot>
      <Container
        sx={{
          // mt: 3,
          // ml: 1,
          // mb: 14,
          // zIndex: 1,
          bgcolor: 'red',
          // width: '95vw',
        }}
        >
        <div>testando area de visualização</div>
        {/* <RafflesCarrocel raffles={raffles} /> */}
      </Container>
    </RaffleSessionLayoutRoot>
  );
}
