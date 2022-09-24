import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import { IProduct } from '../../../utils/interfaces';

// ----------------------------------------------------------------------

interface listProduct {
  products: IProduct[]
}
export default function ProductList({ products, ...other }: listProduct) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          {/* <ShopProductCard product={product} /> */}
          <ShopProductCard name='tiago' price={40} details='fhdskfh' images={['']} id="7465748" isNew={true} />
        </Grid>
      ))}
    </Grid>
  );
}
