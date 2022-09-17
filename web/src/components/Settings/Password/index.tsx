import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, IconButton, InputAdornment, TextField } from '@mui/material';
import { FormProvider, RHFTextField } from '../../hook-form';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
// import { Stack, IconButton, InputAdornment } from '@mui/material';
import Iconify from '../../Iconify';
// import api from '../../../services/api';


const index = (props) => {
  const title = 'Senha';

    const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    password: Yup.string().required('Senha é Obrigatória'),
    newPassword: Yup.string().required('Senha é Obrigatória'),
    confirmNewPassword: Yup.string().when('password', (newPassword, field) =>
    newPassword ? field.required('Confirmação de senha obrigatório').oneOf([Yup.ref('newPassword')]) : field
  ),
  });

  const defaultValues = {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    // console.log(data)
    // await api.post('/users/add',data)
    // navigate('/dashboard', { replace: true });
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
<Card>
        <CardHeader
          subheader="Atualize sua Senha"
          title={title}
        />
        <Divider />
        <CardContent>
          
        <RHFTextField
          name="password"
          label="Digite sua Senha"
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
          name="newPassword"
          label="Digite a nova senha"
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
          name="confirmNewPassword"
          label="Confirme sua Nova Senha"
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
           Atualizar
         </LoadingButton>
        </Box>

      </Card>
      </FormProvider>
  );
};

export default index;
