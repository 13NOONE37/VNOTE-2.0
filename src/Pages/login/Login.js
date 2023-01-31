import React, { useEffect, useRef, useState } from 'react';
import './Login.css';

import Monitor from './Monitor/Monitor';
import Page1 from './Monitor/Page1';
import Page2 from './Monitor/Page2';
import Page3 from './Monitor/Page3';
import Page4 from './Monitor/Page4';

import Logo from 'assets/Logo/Logo';

import { ReactComponent as Dot } from 'assets/Icons/dot.svg';
import { ReactComponent as Trust } from 'assets/Icons/Shapes/trust.svg';
import { ReactComponent as Dots } from 'assets/Icons/Shapes/dots.svg';
import { ReactComponent as Dots2 } from 'assets/Icons/Shapes/dots2.svg';
import { ReactComponent as Cross } from 'assets/Icons/Shapes/cross.svg';
import { ReactComponent as Rainbow } from 'assets/Icons/Shapes/rainbow.svg';
import { ReactComponent as Rect } from 'assets/Icons/Shapes/rect.svg';
import { Outlet } from 'react-router-dom';

export default function Login() {
  const [currentPage, setCurrentPage] = useState(1);

  let slideId;
  const interval = 12000;

  const nextButtonRef = useRef(null);
  const nextPage = () => nextButtonRef.current.click();

  useEffect(() => {
    slideId = setInterval(() => {
      nextPage();
    }, interval);

    return () => {
      clearInterval(slideId);
    };
  }, [currentPage]);

  return (
    <div className="loginPage">
      <div className="loginPage--box">
        <div className=" loginPage--box--leftBlock">
          <div className="loginPage--header">
            <Logo forceDark />
          </div>
          <Outlet />
        </div>
        <div className="loginPage--box--rightBlock">
          <div className="monitor">
            <div className="monitor--container">
              <button
                onClick={() => setCurrentPage((currentPage % 4) + 1)}
                style={{ display: 'none' }}
                ref={nextButtonRef}
              ></button>
              <Monitor>
                {currentPage === 1 && <Page1 />}
                {currentPage === 2 && <Page2 />}
                {currentPage === 3 && <Page3 />}
                {currentPage === 4 && <Page4 />}
              </Monitor>
            </div>
            {[
              {
                heading: 'Simplify your notes',
                subheading: 'Save your thougs simply',
              },
              {
                heading: 'Keep it secret',
                subheading: 'All of your notes are strongly encrypted',
              },
              {
                heading: 'Cross-platform',
                subheading:
                  'Our app is avaible for: Windows, Linux, Mac, iOS and Android ',
              },
              {
                heading: 'Web 3.0',
                subheading: 'Web 3.0 version is in development...',
              },
            ].map(
              (item, index) =>
                currentPage === index + 1 && (
                  <>
                    <h3 className="monitor--info">{item.heading}</h3>
                    <h4 className="monitor--subinfo">{item.subheading}</h4>
                  </>
                ),
            )}
            <div className="monitor--nav">
              {[1, 2, 3, 4].map((item, index) => (
                <button
                  className="monitor--nav--dot"
                  onClick={() => setCurrentPage(item)}
                  key={index}
                >
                  <Dot
                    className={`monitor--nav--dot--icon ${
                      currentPage === item && 'monitor--nav--dot--icon__active'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="shapes">
            <Rect className="shapes--rect1" />
            <Rect className="shapes--rect2" />
            <Cross className="shapes--cross" />
            <Rainbow className="shapes--rainbow" />
            <Dots2 className="shapes--dots2" />
          </div>
        </div>
      </div>
      <Trust className="loginPage--shape loginPage--shape__trust" />
      <Dots className="loginPage--shape loginPage--shape__dots" />
    </div>
  );
}
const isEmailCorrect = (email) => {
  let regexEmail = new RegExp(
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );
  return regexEmail.test(email);
};
const LoginInfo = ({ children, text, action }) => {
  return (
    <span className="form--info">
      {children}
      <button className="form--info--button" type="button" onClick={action}>
        {text}
      </button>
    </span>
  );
};
const LoginSplitter = ({ children }) => {
  return (
    <span className="splitter">
      <span className="splitter--line"></span>
      <span className="splitter--text">{children}</span>
      <span className="splitter--line"></span>
    </span>
  );
};
const LoginInput = ({
  type,
  placeholder,
  containerClasses,
  inputClasses,
  field,
  error,
}) => {
  return (
    <span className={`form--inputBox ${containerClasses}`}>
      <input
        type={type}
        className={`form--inputBox--input ${inputClasses}`}
        {...field}
      />
      <label
        className={`form--inputBox--placeholder ${
          field.value.length > 0 && 'form--inputBox--input__focused'
        }`}
        htmlFor={field.name}
      >
        {placeholder}
      </label>
      {error && <span className="form--inputBox--error">{error}</span>}
    </span>
  );
};
const LoginError = ({ children }) => {
  return <h3 className="form--error">{children}</h3>;
};
const LoginSuccess = ({ children }) => {
  return <h3 className="form--success">{children}</h3>;
};
const LoginButton = ({ icon, children, action, classes, type, ...props }) => {
  return (
    <button
      className={`form--button ${classes}`}
      onClick={action}
      type={type}
      {...props}
    >
      {icon}
      <span className="form--button--text"> {children}</span>
    </button>
  );
};
LoginButton.defaultProps = {
  type: 'button',
};
export {
  LoginInfo,
  LoginSplitter,
  LoginInput,
  LoginError,
  LoginSuccess,
  LoginButton,
  isEmailCorrect,
};
