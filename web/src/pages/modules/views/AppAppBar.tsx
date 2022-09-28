import { Box, Button } from '@mui/material';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import React from 'react';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountPopover from '../../../layouts/dashboard/AccountPopover';
import Checkout from '../../Checkout/Checkout'
import { useAuth } from '../../../context/AuthContext';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

interface IAppAppBarProps {
  qntItensCar?: number;

}
// const AppAppBar: React.FC = () => {
const AppAppBar = ({ qntItensCar }: IAppAppBarProps) => {
  const { userLogged } = useAuth()
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            // href="/"
            sx={{ fontSize: 24 }}
          >
            {'nome da empresa'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {/* <IconButton size="large" onClick={()=>console.log()} aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={qntItensCar} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton> */}
          <Checkout />
            {userLogged() ? (
              <AccountPopover />
            ) : (
              <Box>
                <Link color="inherit" variant="h6" underline="none" href="/signIn/" sx={rightLink}>
                  {'Login'}
                </Link>
                <Link variant="h6" underline="none" href="/signUp/" sx={{ ...rightLink, color: 'secondary.main' }}>
                  {'Registre-se'}
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppAppBar;
