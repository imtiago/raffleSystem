import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import React from 'react';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

const AppAppBar: React.FC = () => {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'nome da empresa'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/signIn/"
              sx={rightLink}
            >
              {'Login'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/signUp/"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {'Registre-se'}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
