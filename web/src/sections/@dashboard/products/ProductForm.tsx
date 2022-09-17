import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import api from '../../../services/api';

// ----------------------------------------------------------------------

export default function Index() {
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };


  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('Primeiro nome é obrigatório'),
    lastName: Yup.string().required('Ultimo nome é obrigatório'),
    cpf: Yup.string().required('CPF é obrigatório'),
    rg: Yup.string().required('RG obrigatório'),
    // birthDay: Yup.date().required('Data de Nascimento obrigatório'),
    birthDay: Yup.string().required('Data de Nascimento obrigatório'),
    email: Yup.string().email('Somente endereços de e-mail').required('Email é obrigatório'),
    password: Yup.string().required('Senha é Obrigatória'),
    confirmPassword: Yup.string().when('password', (password, field) =>
    password ? field.required('Confirmação de senha obrigatório').oneOf([Yup.ref('password')]) : field
  ),
    // confirmPassword: Yup.string().required('Confirmação de senha obrigatório'),
  });

  // const defaultValues = {
  //   name: '',
  //   lastName: '',
  //   cpf: '',
  //   rg: '',
  //   birthDay: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    // defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    // console.log(data)
    await api.post('/users/add',data)
    // navigate('/dashboard', { replace: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label="nome" autoFocus/>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="price" label="Preço" />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="new" label="Novo" type='checkbox' />
        </Stack>

        <RHFTextField name="email" label="Endereço de Email" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Adicionar
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
