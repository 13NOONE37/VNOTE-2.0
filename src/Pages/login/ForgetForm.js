import React from 'react';
import { ReactComponent as Github } from 'assets/Icons/github.svg';
import { ReactComponent as Twitter } from 'assets/Icons/twitter.svg';
import { ReactComponent as Google } from 'assets/Icons/google.svg';
import { LoginButton, LoginInput, LoginInfo, LoginSplitter } from './Login';
import { useNavigate } from 'react-router-dom';
export default function ForgetForm() {
  const navigate = useNavigate();

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

      <LoginButton classes={'form--button__submit'} type={'submit'}>
        Search
      </LoginButton>
      <LoginInfo text={'Log in here'} action={() => navigate('/login')}>
        Go back?
      </LoginInfo>
    </form>
  );
}
