import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { Typography } from "@mui/material";
import { TextInput } from "@/components/atoms/TextInput";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { AuthPage } from "@/components/layouts/AuthPage";

const REQUIRED_FIELD_MESSAGE = "Required field.";
const INVALID_EMAIL_MESSAGE = "Invalid Email.";
const MIN_PASSWORD_LENGTH_MESSAGE = "At least 8 characters required.";

interface RegisterFormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

const RegisterFormSchema = Yup.object().shape({
  email: Yup.string()
    .email(INVALID_EMAIL_MESSAGE)
    .required(REQUIRED_FIELD_MESSAGE),
  password: Yup.string()
    .required(REQUIRED_FIELD_MESSAGE)
    .min(8, MIN_PASSWORD_LENGTH_MESSAGE),
  repeatPassword: Yup.string()
    .required(REQUIRED_FIELD_MESSAGE)
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const RegisterPage = () => {
  const { register } = useFirebaseAuth();
  const router = useRouter();

  const handleSubmit = React.useCallback(
    async (values: RegisterFormValues) => {
      try {
        await register(values.email, values.password);
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
    [register, router]
  );

  return (
    <AuthPage>
      <div>
        <Formik<RegisterFormValues>
          initialValues={{
            email: "",
            password: "",
            repeatPassword: "",
          }}
          validateOnBlur
          validateOnMount
          validateOnChange
          validationSchema={RegisterFormSchema}
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
              <Typography>Welcome! Please Sign Up.</Typography>

              <TextInput
                id="email"
                type="email"
                label="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={!!(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextInput
                id="password"
                type="password"
                label="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={!!(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />

              <TextInput
                id="repeatPassword"
                type="password"
                label="Re-enter password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.repeatPassword}
                error={!!(touched.repeatPassword && errors.repeatPassword)}
                helperText={touched.repeatPassword && errors.repeatPassword}
              />

              <LoadingButton
                disabled={!isValid || isValidating}
                loading={isSubmitting || isValidating}
                type="submit"
              >
                Sign Up
              </LoadingButton>
            </form>
          )}
        </Formik>
      </div>
    </AuthPage>
  );
};

export default RegisterPage;
