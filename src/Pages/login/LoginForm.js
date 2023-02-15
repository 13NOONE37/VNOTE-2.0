import { useContext } from 'react';
import { ReactComponent as Github } from 'assets/Icons/github.svg';
import { ReactComponent as Twitter } from 'assets/Icons/twitter.svg';
import { ReactComponent as Google } from 'assets/Icons/google.svg';
import {
  LoginButton,
  LoginInput,
  LoginInfo,
  LoginSplitter,
  LoginError,
} from './Login';
import AppContext from 'store/AppContext';
import { useNavigate } from 'react-router-dom';
import handlePasswordSignIn from 'utils/Firebase/Actions/auth_signin_password';
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import useAuthProvider from 'utils/Firebase/Actions/useAuthProvider';
import { useTranslation } from 'react-i18next';
export default function LoginForm() {
  const { t } = useTranslation();
  const { toggleLanguage } = useContext(AppContext);
  const navigate = useNavigate();
  const { setIsLogged, setUserInfo } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState(false);

  const { githubAuth, twitterAuth, googleAuth } = useAuthProvider(
    setUserInfo,
    setIsLogged,
    setErrorMessage,
  );

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = t('Required');
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = t('Invalid email address');
          }
          if (!values.password) {
            errors.password = t('Required');
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handlePasswordSignIn(
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
            <h2 className="form--heading">{t('Sign In')}</h2>

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
                    placeholder={t('Password')}
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
              {isSubmitting ? '...' : t('Sign In')}
            </LoginButton>
            {errorMessage && <LoginError>{t(errorMessage)}</LoginError>}
            <LoginInfo
              text={t('Forgot password?')}
              action={() => navigate('/login/forget')}
            />
            {/* <LoginSplitter>or</LoginSplitter> */}

            <LoginInfo
              text={t('Create it here')}
              action={() => navigate('/login/register')}
            >
              {t("Don't have an account?")}
            </LoginInfo>

            <LoginSplitter>{t('or')}</LoginSplitter>

            <LoginButton
              onClick={githubAuth}
              icon={<Github />}
              classes={'form--button__github'}
            >
              {t('Continue with Github')}
            </LoginButton>
            <LoginButton
              onClick={twitterAuth}
              icon={<Twitter />}
              disabled={true}
              classes={'form--button__twitter form--button__disabled'}
            >
              {t('Continue with Twitter')}
            </LoginButton>
            <LoginButton
              onClick={googleAuth}
              icon={<Google />}
              classes={'form--button__google'}
            >
              {t('Continue with Google')}
            </LoginButton>
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
