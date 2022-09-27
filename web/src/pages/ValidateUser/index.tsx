import { Link as RouterLink, useParams, useSearchParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../../components/Page';
import { useEffect, useState } from 'react';
import api from '../../services/api';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

const ops = {
  valid:{
    title:"Validado com sucesso!",
    content: "Usuario validado com sucesso!\n Agora você ja pode realizar suas operações!",
    icon:"/static/illustrations/check.png"
  },
  inValid:{
    title:"Error na validação",
    content:"Ocorreu um erro na sua validação, Entre em contato conosco! ",
    icon:"/static/illustrations/noCheck.png"
  }
}

export default function Index() {
  const {id, validateId} = useParams();
  const [validate, setValidate] = useState(ops.valid);
 

    useEffect(() => {
      const validateUser = async () => {
        try {
          await api.get(`/verifyAccount/${id}/token/${validateId}`);
        } catch (error){
          setValidate(ops.inValid)
        }
      };
      validateUser();
    }, []);

  return (
    <Page title="Validação de Usuário">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            {
              validate.title
            }
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            {
              validate.content
            }
          </Typography>

          <Box
            component="img"
            src={validate.icon}
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/index" size="large" variant="contained" component={RouterLink}>
            Voltar para o Inicio
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
