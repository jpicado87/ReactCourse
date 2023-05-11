import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { Button, Typography } from "@mui/material";
import { TextInput } from "@/components/atoms/TextInput";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { AuthPage } from "@/components/layouts/AuthPage";

const REQUIRED_FIELD_MESSAGE = "Required field.";
const INVALID_EMAIL_MESSAGE = "Invalid Email.";
const MIN_PASSWORD_LENGTH_MESSAGE = "At least 8 characters required.";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email(INVALID_EMAIL_MESSAGE)
    .required(REQUIRED_FIELD_MESSAGE),
  password: Yup.string()
    .required(REQUIRED_FIELD_MESSAGE)
    .min(8, MIN_PASSWORD_LENGTH_MESSAGE),
});

const LoginPage = () => {
  const { login } = useFirebaseAuth();
  const router = useRouter();

  const handleSubmit = React.useCallback(
    async (values: LoginFormValues) => {
      try {
        await login(values.email, values.password);
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
    [login, router]
  );
  return (
    <AuthPage>
      <div>
        <Formik<LoginFormValues>
          initialValues={{
            email: "",
            password: "",
          }}
          validateOnBlur
          validateOnMount
          validateOnChange
          validationSchema={LoginFormSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            isValid,
            isValidating,
          }) => (
            <form onSubmit={handleSubmit}>
              <Typography>Welcome back! Please Sign In.</Typography>

              <TextInput
                id="email"
                type="email"
                label="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={!!(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              ></TextInput>

              <TextInput
                id="password"
                type="password"
                label="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={!!(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              ></TextInput>

              <LoadingButton
                disabled={!isValid || isValidating}
                loading={isSubmitting || isValidating}
                type="submit"
              >
                Sign In
              </LoadingButton>

              <Button variant="text" onClick={() => router.push("/register")}>
                Register
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </AuthPage>
  );
};

export default LoginPage;
