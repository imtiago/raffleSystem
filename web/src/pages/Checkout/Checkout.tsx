import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import Iconify from '../../Iconify';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CheckoutPage from '../CheckoutPage/CheckoutPage';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// import { RegisterForm } from '../../../sections/auth/register';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton size="large" onClick={handleClickOpen} aria-label="show 4 new mails" color="inherit">
        {/* <Badge badgeContent={qntItensCar} color="error"> */}
        <Badge badgeContent={5} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <BootstrapDialog
        sx={{
          pt: 5,
          pr: 20,
          pl: 20,
        }}
        fullScreen
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        TransitionComponent={Transition}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Checkout
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <CheckoutPage />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
