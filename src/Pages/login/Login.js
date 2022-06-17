import React from 'react';
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
            <Logo />
          </div>
          <form className="form form__login">
            <h2 className="form--heading">Login</h2>
            <input type="email" className="form--input" />
            <input
              type="password"
              className="form--input form--input__password"
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
