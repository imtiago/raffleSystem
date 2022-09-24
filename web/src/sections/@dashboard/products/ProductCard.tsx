import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import { IProduct } from '../../../utils/interfaces';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

export default function ShopProductCard(product: IProduct) {
const { name, price, isNew, link, images } = product
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
         <ProductImgStyle alt={name} src={images[0] || ''} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={link || ''} color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>{isNew ? 'Novo' : 'Usado'}</Typography>
          <Typography variant="subtitle1">
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
