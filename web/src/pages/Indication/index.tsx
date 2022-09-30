// @mui
import { useTheme } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import { useAuth } from '../../context/AuthContext';
import { Box, Container, Typography, Card, CardActions, CardContent, Divider } from '@mui/material';
import Img from '../../components/Img/Img';
import generateQR from '../../utils/GeneratorQrCode';
import { useEffect, useState } from 'react';
// const APP_URL = process.env.APP_URL
// ----------------------------------------------------------------------
export default function Index() {
  const { user } = useAuth();
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    console.log(import.meta.env)
    const generate = async () => {
      if (user) {
        const qr = await generateQR(`${user?.indicationCode.indicationCode}`);
        setQrCode(qr);
      }
    }
    generate();
  },[])

  return (
    <Page title="Meu Perfil">
      <Container maxWidth="xl">
        <Box
        sx={{ 
          mb: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '400px',
          height: '400px',
          // bgcolor: 'red',
          position: 'relative',
          }}>
            <Img src={qrCode} />

        {/* <Card>
          <CardContent>
            <Box
              sx={{
                // alignItems: 'center',
                // display: 'flex',
                // flexDirection: 'column',
                position: 'relative',
                pt: '100%',
                // height: '50',
                // right: '50',
              }}
              >
              <Img src={user?.indicationCode.qrCode} />
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{}}>
            <Typography color="primary">{user?.indicationCode.indicationCode}</Typography>
          </CardActions>
        </Card> */}
              </Box>
      </Container>
    </Page>
  );
}
