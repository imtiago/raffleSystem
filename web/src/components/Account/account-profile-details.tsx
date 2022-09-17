import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { FormProvider, RHFTextField } from '../hook-form';
import Iconify from '../Iconify';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '../../context/AuthContext';


export const AccountProfileDetails = () => {
  const { user } = useAuth()

  // const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('Primeiro nome é obrigatório'),
    lastName: Yup.string().required('Ultimo nome é obrigatório'),
    cpf: Yup.string().required('CPF é obrigatório'),
    rg: Yup.string().required('RG obrigatório'),
    birthDay: Yup.date().required('Data de Nascimento obrigatório'),
    email: Yup.string().email('Somente endereços de e-mail').required('Email é obrigatório'),
    password: Yup.string().required('Senha é Obrigatória'),
  });

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: user,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const onSubmit = async (data) => {
  const onSubmit = async () => {
    // console.log(data)
    // await api.post('/users/add',data)
    // navigate('/dashboard', { replace: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          // subheader="Podemos ed"
          title="Meu Perfil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <RHFTextField name="firstName" label="Primeiro nome" />

            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <RHFTextField name="lastName" label="Ultimo nome" />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <RHFTextField name="email" label="Endereço de Email" />

            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <RHFTextField name="cpf" label="cpf" />

            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <RHFTextField name="rg" label="rg" />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <RHFTextField type='date' name="birthDay" min='2012-02-12' label="Data de Nascimento" />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <RHFTextField
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Salvar Alterações
          </LoadingButton>
        </Box>
      </Card>
    </FormProvider>
  );
};
