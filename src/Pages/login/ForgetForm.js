import React, { useState } from 'react';
import { ReactComponent as Github } from 'assets/Icons/github.svg';
import { ReactComponent as Twitter } from 'assets/Icons/twitter.svg';
import { ReactComponent as Google } from 'assets/Icons/google.svg';
import {
  LoginButton,
  LoginInput,
  LoginInfo,
  LoginSplitter,
  LoginError,
  LoginSuccess,
} from './Login';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import handlePasswordReset from 'utils/Firebase/Actions/auth_send_password_reset';
export default function ForgetForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  return (
    <>
      <Formik
        initialValues={{ email: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setErrorMessage(false);
            handlePasswordReset(
              values.email,
              setErrorMessage,
              setSuccessMessage,
            );
            // handlePasswordSignIn(
            //   values.email,
            //   values.password,
            //   setErrorMessage,
            //   setIsLogged,
            //   setUserInfo,
            // );
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form form__login">
            <h2 className="form--heading">Find Your Account</h2>

            <Field name="email">
              {({ field, form: { touched, errors }, meta }) => (
                <>
                  <LoginInput
                    type="email"
                    placeholder={'Email'}
                    containerClasses={'form--inputBox__nomargin'}
                    field={field}
                    error={meta.touched && meta.error ? meta.error : false}
                  />
                </>
              )}
            </Field>

            <LoginButton
              classes={'form--button__submit'}
              type={'submit'}
              disabled={isSubmitting}
            >
              {isSubmitting ? '...' : 'Search'}
            </LoginButton>
            {errorMessage && <LoginError>{errorMessage}</LoginError>}
            {successMessage && <LoginSuccess>{successMessage}</LoginSuccess>}

            <LoginInfo text={'Log in here'} action={() => navigate('/login')}>
              Go back?
            </LoginInfo>
          </Form>
        )}
      </Formik>
    </>
  );
}
