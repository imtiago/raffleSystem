import { Box, Link } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Typography from "../modules/components/Typography";
import AppAppBar from "../modules/views/AppAppBar";
import AppFooter from "../modules/views/AppFooter";
import AppForm from "../modules/views/AppForm";
import FormButton from '../modules/form/FormButton';
import FormFeedback from "../modules/form/FormFeedback";
import { email, required } from "../modules/form/validation";
import RFTextField from "../modules/form/RFTextField";

// import "./styles.css";

const Login: React.FC = () => {


    const [sent, setSent] = useState(false);

  const validate = (values: { [index: string]: string }) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = () => {
    setSent(true);
  };




  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();

  useEffect(() => {
    localStorage.removeItem("@PermissionYT:token");
  }, []);

  const { signIn } = useAuth();

  // const handleSubmit = useCallback(
  //   async (event) => {
  //     event.preventDefault();

  //     await signIn({ username, password });
  //     history("/dashboard");
  //   }
  //   ,
  //   [username, password]
  // );

  return (
    <>
      <AppAppBar />
      <AppForm>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link
              href="/premium-themes/onepirate/sign-up/"
              align="center"
              underline="always"
            >
              Sign Up here
            </Link>
          </Typography>
        </>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/premium-themes/onepirate/forgot-password/">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </>
   );
};

export default Login;
