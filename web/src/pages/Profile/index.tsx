// @mui
import { useTheme } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import { useAuth } from '../../context/AuthContext';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../../components/Account/account-profile';
import { AccountProfileDetails } from '../../components/Account/account-profile-details';

// ----------------------------------------------------------------------
export default function Index() {
  const theme = useTheme();
  const { user } = useAuth()

  return (
    <Page title="Meu Perfil">
      <Container maxWidth="xl">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Meu Perfil
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
