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
import {useAuth} from '../../../context/AuthContext';
import CustomAlert from '../../../components/Alert'


// ----------------------------------------------------------------------

interface IProps {
  indicationCode?: string,
}
export default function RegisterForm({indicationCode}: IProps) {
  const { signIn } = useAuth()
  const navigate = useNavigate();
  
  const [openAlert, setOpenAlert] = useState(false);
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

  const handleOpen = () => {
    setOpenAlert(true);
  };

  const onSubmit = async (data) => {
    try{
      await api.post('/users/',data)
      handleOpen();
      localStorage.removeItem('indicationCode');
      reset()
      // const {email, password} = data;
      // signIn({email, password})
    }catch (error){
      alert("ocorreu um erro")
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="Primeiro nome" autoFocus/>
          <RHFTextField name="lastName" label="Ultimo nome" />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField type='tel' name="phone" label="WhatsApp" />
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
      {
openAlert &&<CustomAlert />
      }
    </FormProvider>
  );
}
