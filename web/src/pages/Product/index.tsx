import { useEffect, useState } from 'react';
// material
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../../sections/@dashboard/products';
// mock
// import PRODUCTS from '../../_mock/products';
import Iconify from '../../components/Iconify';
import RegisterProductModal from '../../components/Modals/RegisterProduct';
import api from '../../services/api';

// ----------------------------------------------------------------------

export default function Index() {
  const [openFilter, setOpenFilter] = useState(false);
  const [itemsList, setItemsList] = useState([]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get('/products');
        console.log(response.data)
        setItemsList(response.data);
      } catch {}
    };
    getProducts();
  }, []);

  return (
    <Page title="Produtos">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Produtos
          </Typography>
          <RegisterProductModal />
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={itemsList} />
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
