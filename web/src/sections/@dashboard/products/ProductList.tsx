import { Grid } from '@mui/material';
import { IProduct } from '../../../components/cards/Product/ProductCard';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

interface listProduct {
  products: IProduct[]
}
export default function ProductList({ products, ...other }: listProduct) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
