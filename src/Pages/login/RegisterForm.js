import React, { useState, useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  LoginButton,
  LoginInput,
  LoginInfo,
  LoginSplitter,
  LoginError,
} from './Login';

import handlePasswordSignUp from 'utils/Firebase/Actions/auth_signup_password';

import { ReactComponent as Github } from 'assets/Icons/github.svg';
import { ReactComponent as Twitter } from 'assets/Icons/twitter.svg';
import { ReactComponent as Google } from 'assets/Icons/google.svg';
import AppContext from 'store/AppContext';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { setIsLogged, setUserInfo } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState(false);

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          } else if (values.password.length < 8) {
            errors.password = 'Length should be more than 8 characters';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handlePasswordSignUp(
              values.email,
              values.password,
              setErrorMessage,
              setIsLogged,
              setUserInfo,
            );
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form form__login">
            <h2 className="form--heading">Create account</h2>

            <Field name="email">
              {({ field, form: { touched, errors }, meta }) => (
                <>
                  <LoginInput
                    type="email"
                    placeholder={'Email'}
                    containerClasses={'form--inputBox__margin'}
                    field={field}
                    error={meta.touched && meta.error ? meta.error : false}
                  />
                </>
              )}
            </Field>

            <Field name="password">
              {({ field, form: { touched, errors }, meta }) => (
                <>
                  <LoginInput
                    type="password"
                    placeholder={'Password'}
                    containerClasses={'form--inputBox__password'}
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
              {isSubmitting ? '...' : 'Sign Up'}
            </LoginButton>
            {errorMessage && <LoginError>{errorMessage}</LoginError>}
            <LoginInfo text={'Log in here'} action={() => navigate('/login')}>
              Already have an account?
            </LoginInfo>

            <LoginSplitter>or</LoginSplitter>

            <LoginButton icon={<Github />} classes={'form--button__github'}>
              Continue with Github
            </LoginButton>
            <LoginButton icon={<Twitter />} classes={'form--button__twitter'}>
              Continue with Twitter
            </LoginButton>
            <LoginButton icon={<Google />} classes={'form--button__google'}>
              Continue with Google
            </LoginButton>
          </Form>
        )}
      </Formik>
    </>
  );
}
