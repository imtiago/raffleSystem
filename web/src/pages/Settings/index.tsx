import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box } from '@mui/material';
// components
import Page from '../../components/Page';
import SettingsPassword from '../../components/Settings/Password';
import Iconify from '../../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../../sections/@dashboard/app';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import api from '../../services/api';

// ----------------------------------------------------------------------
interface Dash {
  qntUsers: number,
  qntRaffles: number,
  qntProducts: number
}

export default function Index() {
  const title = 'Configurações'
  const theme = useTheme();
  const { user } = useAuth()

  return (
    <Page title={title}>
      <Container maxWidth="xl">

        <Typography variant="h4" sx={{ mb: 5 }}>
          {title}
        </Typography>

        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
        
      </Container>
    </Page>
  );
}
