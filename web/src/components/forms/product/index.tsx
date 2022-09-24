import React from 'react';
import { FormProvider, RHFTextField } from '../../hook-form';
import { Stack,Button } from '@mui/material';
import { useForm } from 'react-hook-form';

const index = () => {

  const defaultValues = {
    firstName: '',
    lastName: '',
    phone: '',
    // rg: '',
    // birthDay: '',
    // indicationCode: indicationCode || '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm();

  const {
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    // try{
    //   await api.post('/users/',data)
    //   const {email, password} = data;
    //   signIn({email, password})
    // }catch (error){
    //   alert("ocorreu um erro")
    // }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RHFTextField name="name" label="nome"/>
        <RHFTextField name="price" type="number" label="Preço / Valor"/>
        <RHFTextField name="details" label="detalhes" rows={4} multiline/>
        <RHFTextField name="isNew" label="Novo ou usado"/>
        <RHFTextField name="link" label="Link para detalhes"/>
      </Stack>
    </FormProvider>
  );
};

export default index;
