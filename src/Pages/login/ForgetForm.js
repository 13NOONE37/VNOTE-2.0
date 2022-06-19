import React from 'react';
import { ReactComponent as Github } from 'assets/Icons/github.svg';
import { ReactComponent as Twitter } from 'assets/Icons/twitter.svg';
import { ReactComponent as Google } from 'assets/Icons/google.svg';
import { LoginButton, LoginInput, LoginInfo, LoginSplitter } from './Login';
export default function ForgetForm() {
  return (
    <form className="form form__login">
      <h2 className="form--heading">Find Your Account</h2>
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
        Sign in
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
