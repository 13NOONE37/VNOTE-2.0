import React, { useContext, useReducer } from 'react';
import { ReactComponent as Github } from 'assets/Icons/github.svg';
import { ReactComponent as Twitter } from 'assets/Icons/twitter.svg';
import { ReactComponent as Google } from 'assets/Icons/google.svg';
import { LoginButton, LoginInput, LoginInfo, LoginSplitter } from './Login';
import AppContext from 'store/AppContext';
export default function LoginForm() {
  const { setIsLogged } = useContext(AppContext);
  const [formValues, setFormValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      password: '',
      error: false,
    },
  );
  let regexEmail = new RegExp(
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );
  //regexEmail.test(formValues.email)
  const handleEmail = (e) => {
    setFormValues({ ['email']: e.target.value });
  };
  const handlePassword = (e) => {
    setFormValues({ ['password']: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLogged(true);
  };
  return (
    <form className="form form__login">
      <h2 className="form--heading">Log In</h2>
      <LoginInput
        type="email"
        placeholder={'Email'}
        name={'email'}
        value={formValues.email}
        onChange={handleEmail}
        containerClasses={'form--inputBox__margin'}
      />

      <LoginInput
        type="password"
        classes={'form--inputBox--input__password'}
        placeholder={'Password'}
        name={'password'}
        value={formValues.password}
        onChange={handlePassword}
      />

      <LoginButton
        classes={'form--button__submit'}
        type={'submit'}
        action={handleSubmit}
      >
        Log in
      </LoginButton>
      <LoginInfo text={'Create it here'}>Don't have an account?</LoginInfo>

      <LoginSplitter>or</LoginSplitter>

      <LoginButton icon={<Github />} classes={'form--button__github'}>
        Login with Github
      </LoginButton>
      <LoginButton icon={<Twitter />} classes={'form--button__twitter'}>
        Login with Twitter
      </LoginButton>
      <LoginButton icon={<Google />} classes={'form--button__google'}>
        Login with Google
      </LoginButton>
    </form>
  );
}
