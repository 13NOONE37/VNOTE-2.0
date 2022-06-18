import React, { useRef } from 'react';
import './Login.css';

import { ReactComponent as Monitor } from 'assets/Icons/monitor.svg';
import { ReactComponent as Github } from 'assets/Icons/github.svg';
import { ReactComponent as Twitter } from 'assets/Icons/twitter.svg';
import { ReactComponent as Google } from 'assets/Icons/google.svg';
import { ReactComponent as Trust } from 'assets/Icons/Shapes/trust.svg';
import { ReactComponent as Dots } from 'assets/Icons/Shapes/dots.svg';
import Logo from 'assets/Logo/Logo';
export default function Login() {
  return (
    <div className="loginPage">
      <div className="loginPage--box">
        <div className=" loginPage--box--leftBlock">
          <div className="loginPage--header">
            <Logo forceDark />
          </div>
          <form className="form form__login">
            <h2 className="form--heading">Login</h2>
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

            <button type="submit" className="form--button form--button__submit">
              <span>Sign in</span>
            </button>
            <span className="form--info">
              Don't have an account?
              <button className="form--info--button">Create it here</button>
            </span>
            <span className="splitter">
              <span className="splitter--line"></span>
              <span className="splitter--text">or</span>
              <span className="splitter--line"></span>
            </span>
            <button className="form--button form--button__github">
              <Github />
              <span className="form--button--text">Login with Github</span>
            </button>
            <button className="form--button form--button__twitter">
              <Twitter />
              <span className="form--button--text">Login with Twitter</span>
            </button>
            <button className="form--button form--button__google">
              <Google />
              <span className="form--button--text">Login with Google</span>
            </button>
          </form>
        </div>
        <div className=" loginPage--box--rightBlock">
          <div className="monitor">
            <div className="monitor--container">
              <Monitor className="monitor--icon" />
              {/* images for monitor */}
              {/* images for monitor */}
              {/* images for monitor */}
            </div>
            <div className="monitor--info"></div>
            <div className="monitor--nav"></div>
          </div>
        </div>
      </div>
      <div className="loginPage--shapes">
        <Trust />
        <Dots />
        <Dots />
      </div>
    </div>
  );
}
const LoginInput = ({
  value,
  changeValue,
  type,
  name,
  placeholder,
  classes,
  containerClasses,
}) => {
  return (
    <span className={`form--inputBox ${containerClasses}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={changeValue}
        className={`form--inputBox--input ${classes}`}
      />
      <label
        className={`form--inputBox--placeholder ${
          value.length > 0 && 'form--inputBox--input__focused'
        }`}
        htmlFor={name}
      >
        {placeholder}
      </label>
    </span>
  );
};
