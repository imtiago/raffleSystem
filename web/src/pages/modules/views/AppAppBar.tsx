import { Box, Button } from '@mui/material';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import React from 'react';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import AccountPopover from '../../../layouts/dashboard/AccountPopover';
import Checkout from '../../Checkout/Checkout';
import DetailsOrder from '../../DetailsOrder/DetailsOrder';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

interface IAppAppBarProps {}
// const AppAppBar: React.FC = () => {
const AppAppBar = ({}: IAppAppBarProps) => {
  const { isLogeed } = useAuth();
  const { cart } = useCart();
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
            {'Acredite você tambem'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {/* <IconButton
              size="large"
              onClick={() => console.log(cart.length)}
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton> */}
            <Checkout />
            {/* <Button variant="outlined" size="large" color="inherit" endIcon={<SearchIcon />}>
            <AccountPopover />
              Consulte sua ordem
            </Button> */}
            {/* {userLogged() ? ( */}
            {isLogeed ? (
              <Button
                variant="outlined"
                href="/dashboard"
                size="large"
                color="inherit"
                startIcon={<DashboardRoundedIcon />}
              >
                inicio
              </Button>
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
            <DetailsOrder />
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Checkout /> */}
    </div>
  );
};

export default AppAppBar;
