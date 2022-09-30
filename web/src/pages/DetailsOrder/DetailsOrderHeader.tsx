import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface DetailsOrderHeaderProps {
  searchFunc: (code: string) => void;
}

export default function DetailsOrderHeader({ searchFunc }: DetailsOrderHeaderProps) {
  const [orderCode, setOrderCode] = useState<string>('');

  const passOrderCode = (event) => {
    setOrderCode(event.target.value);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      // width={'100%'}
      p={3}
      borderRadius={2}
      bgcolor="rgba(0, 0, 0, 0.1)"
    >
      <TextField label="Nº Order" fullWidth onChange={passOrderCode} defaultValue={orderCode}></TextField>

      <Button
        variant="contained"
        color="primary"
        size="large"
        endIcon={<SearchIcon />}
        onClick={() => searchFunc(orderCode)}
      >
        Consultar
      </Button>
    </Box>
  );
}
