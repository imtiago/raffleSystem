import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

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
import { useAuth } from '../../../context/AuthContext';
import RHFTextFieldMask from '../../../components/hook-form/RHFTextFieldMask';

// ----------------------------------------------------------------------

interface IProps {
  indicationCode?: string;
}
export default function RegisterForm({ indicationCode }: IProps) {
  const { signIn } = useAuth();
  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    firstName: '',
    lastName: '',
    phone: '',
    // rg: '',
    // birthDay: '',
    indicationCode: indicationCode || '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('Primeiro nome é obrigatório'),
    lastName: Yup.string().required('Ultimo nome é obrigatório'),
    phone: Yup.string().required('Telefone é obrigatório'),
    indicationCode: Yup.string(),
    // birthDay: Yup.date().required('Data de Nascimento obrigatório'),
    // birthDay: Yup.string().required('Data de Nascimento obrigatório'),
    email: Yup.string().email('Somente endereços de e-mail').required('Email é obrigatório'),
    password: Yup.string().required('Senha é Obrigatória'),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password ? field.required('Confirmação de senha obrigatório').oneOf([Yup.ref('password')]) : field
    ),
    // confirmPassword: Yup.string().required('Confirmação de senha obrigatório'),
  });

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data) => {
    data.phone = data.phone.replace(/[^0-9]/g,'');
    try {
      await api.post('/users/', data);
      localStorage.removeItem('indicationCode');
      Swal.fire({
        title: 'Sucesso!',
        text: 'Usuario Cadastrado com Sucesso!\n Realize a verificação por email, ou pelo WhatsApp',
        icon: 'success',
      })
      reset();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Ocorreu um erro durante o cadastro!',
        icon: 'error',
      })
      // alert('ocorreu um erro');
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="Primeiro nome" autoFocus />
          <RHFTextField name="lastName" label="Ultimo nome" />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextFieldMask placeholder="(99) 9 9999-9999" mask="(99) 9 9999-9999" type="tel" name="phone" label="WhatsApp"/>
          {/* <RHFTextField placeholder="DD9DDDDDDDD" type="tel" name="phone" label="WhatsApp" maxlength='5'/> */}
          <RHFTextField name="indicationCode" label="Codigo de indicação" />
        </Stack>

        <RHFTextField name="email" label="Endereço de Email" />

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
        <RHFTextField
          name="confirmPassword"
          label="Confirme sua Senha"
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

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Cadastrar-se
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
