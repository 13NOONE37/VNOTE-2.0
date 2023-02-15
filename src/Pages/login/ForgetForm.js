import React, { useContext, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
export default function ForgetForm() {
  const { t } = useTranslation();
  const { toggleLanguage } = useContext(AppContext);
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
            errors.email = t('Required');
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = t('Invalid email address');
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
            <h2 className="form--heading">{t('Find Your Account')}</h2>

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
              {isSubmitting ? '...' : t('Search')}
            </LoginButton>
            {errorMessage && <LoginError>{t(errorMessage)}</LoginError>}
            {successMessage && <LoginSuccess>{successMessage}</LoginSuccess>}

            <LoginInfo
              text={t('Log in here')}
              action={() => navigate('/login')}
            >
              {t('Go back?')}
            </LoginInfo>
            <LoginSplitter classes={'splitter__nomargin'}>
              {t('Language')}
            </LoginSplitter>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <LoginInfo
                text={t('Polish')}
                action={() => toggleLanguage('pl')}
              />
              <LoginInfo
                text={t('English')}
                action={() => toggleLanguage('en')}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
