import React from 'react';
import { ReactComponent as Github } from 'assets/Icons/github.svg';
import { ReactComponent as Twitter } from 'assets/Icons/twitter.svg';
import { ReactComponent as Google } from 'assets/Icons/google.svg';
import { LoginButton, LoginInput, LoginInfo, LoginSplitter } from './Login';
import { useNavigate } from 'react-router-dom';
export default function RegisterForm() {
  const navigate = useNavigate();
  return (
    <form className="form form__login">
      <h2 className="form--heading">Create account</h2>
      <LoginInput
        type="email"
        placeholder={'Email'}
        name={'EmailInput'}
        value={''}
        onChange={() => {}}
        containerClasses={'form--inputBox__margin'}
      />

      <LoginInput
        type="password"
        classes={'form--inputBox--input__password'}
        placeholder={'Password'}
        name={'PasswordInput'}
        value={''}
        onChange={() => {}}
      />

      <LoginButton classes={'form--button__submit'} type={'submit'}>
        Sign Up
      </LoginButton>
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
    </form>
  );
}
