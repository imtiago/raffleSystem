import { Link as RouterLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
// sections
import { RegisterForm } from '../../sections/auth/register';
import AuthSocial from '../../sections/auth/AuthSocial';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ButtonBackToHome from '../../components/ButtonBackToHome';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { isLogeed } = useAuth();
  const navigate = useNavigate();
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const indicationCode = localStorage.getItem('indicationCode');

  // const indicationCode = params.get("indicationCode") || ''

  useEffect(() => {
    if (isLogeed) navigate('/dashboard', { replace: true });
  }, []);

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <Stack display="flex" direction="row" spacing={1}>
            <Logo />
            <ButtonBackToHome />
          </Stack>
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              J?? possui uma conta? {''}
              <Link variant="subtitle2" component={RouterLink} to="/signIn">
                Login
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Gerencie todas as tarefas de forma simples, efici??nte e efic??z
            </Typography>
            <img alt="register" src="/static/illustrations/illustration_register.png" />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography align="center" sx={{ mb: 5 }} variant="h4" gutterBottom>
              Cadastre-se Gratuitamente
            </Typography>

            {/* <Typography sx={{ color: 'text.secondary', mb: 5 }}>Free forever. No credit card needed.</Typography> */}

            {/* <AuthSocial /> */}

            {indicationCode ? <RegisterForm indicationCode={indicationCode} /> : <RegisterForm />}

            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              Ao se cadastrar, voc?? aceita todos os&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Termos de Uso
              </Link>
              {''} e {''}
              <Link underline="always" color="text.primary" href="#">
                Politicas de Servi??os
              </Link>
              .
            </Typography>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                J?? possui uma conta?{' '}
                <Link variant="subtitle2" to="/signIn" component={RouterLink}>
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
