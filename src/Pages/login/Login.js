import React, { useState } from 'react';
import './Login.css';

import Monitor from './Monitor/Monitor';
import Page1 from './Monitor/Page1';
import Page2 from './Monitor/Page2';
import Page3 from './Monitor/Page3';
import Page4 from './Monitor/Page4';

import Logo from 'assets/Logo/Logo';
import LoginForm from './LoginForm';

import { ReactComponent as Dot } from 'assets/Icons/dot.svg';
import { ReactComponent as Trust } from 'assets/Icons/Shapes/trust.svg';
import { ReactComponent as Dots } from 'assets/Icons/Shapes/dots.svg';
import { ReactComponent as Dots2 } from 'assets/Icons/Shapes/dots2.svg';
import { ReactComponent as Cross } from 'assets/Icons/Shapes/cross.svg';
import { ReactComponent as Rainbow } from 'assets/Icons/Shapes/rainbow.svg';
import { ReactComponent as Rect } from 'assets/Icons/Shapes/rect.svg';

export default function Login() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="loginPage">
      <div className="loginPage--box">
        <div className=" loginPage--box--leftBlock">
          <div className="loginPage--header">
            <Logo forceDark />
          </div>
          <LoginForm />
        </div>
        <div className="loginPage--box--rightBlock">
          <div className="monitor">
            <div className="monitor--container">
              <Monitor>
                {currentPage === 1 && <Page1 />}
                {currentPage === 2 && <Page2 />}
                {currentPage === 3 && <Page3 />}
                {currentPage === 4 && <Page4 />}
              </Monitor>
            </div>
            <h3 className="monitor--info">Simplify your notes</h3>
            <h4 className="monitor--subinfo">Save your thougs simply</h4>
            <div className="monitor--nav">
              {[1, 2, 3, 4].map((item) => (
                <button
                  className="monitor--nav--dot"
                  onClick={() => setCurrentPage(item)}
                >
                  <Dot
                    className={`monitor--nav--dot--icon ${
                      currentPage === item && 'monitor--nav--dot--icon__active'
                    }`}
                  />
                </button>
              ))}
              {/* <button
                className="monitor--nav--dot"
                onClick={() => setCurrentPage(1)}
              >
                <Dot
                  className={`monitor--nav--dot--icon ${
                    currentPage === 1 && 'monitor--nav--dot--icon__active'
                  }`}
                />
              </button>
              <button
                className="monitor--nav--dot"
                onClick={() => setCurrentPage(2)}
              >
                <Dot
                  className={`monitor--nav--dot--icon ${
                    currentPage === 2 && 'monitor--nav--dot--icon__active'
                  }`}
                />
              </button>
              <button
                className="monitor--nav--dot"
                onClick={() => setCurrentPage(3)}
              >
                <Dot
                  className={`monitor--nav--dot--icon ${
                    currentPage === 3 && 'monitor--nav--dot--icon__active'
                  }`}
                />
              </button> */}
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
      <div className="loginPage--shapes">
        {/* <Trust />
        <Dots />
        <Dots /> */}
        {/* <svg
          width="827"
          height="556"
          viewBox="0 0 827 556"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M646.607 217.016C646.575 214.535 651.241 213.549 653.341 217.521C655.63 221.061 653.196 228.755 645.601 230.433C638.386 232.567 627.793 226.632 626.409 215.501C624.452 204.768 633.821 191.14 648.62 190.181C662.996 188.382 679.674 201.262 680.274 219.541C681.91 237.463 665.531 257.039 643.587 257.27C622.001 258.76 599.35 238.889 599.476 213.48C598.182 188.404 621.515 162.796 650.633 163.347C679.467 162.22 708.053 188.987 707.208 221.562C708.176 253.876 677.894 285.325 641.575 284.105C605.602 284.835 570.913 251.239 572.542 211.46C571.919 171.951 609.148 134.559 652.646 136.512C695.847 136.09 736.501 176.664 734.142 223.582C734.406 270.25 690.238 313.662 639.562 310.939C589.153 311.013 542.52 263.515 545.608 209.44C545.638 155.586 596.83 106.227 654.659 109.678C712.251 109.949 764.931 164.377 761.073 225.602C760.688 286.639 702.575 341.956 637.549 337.774C572.697 337.15 514.142 275.79 518.677 207.419C519.458 139.219 584.418 77.8851 656.672 82.843C728.739 83.7776 793.272 152.112 788.007 227.623C786.879 302.997 714.971 370.297 635.536 364.608C556.274 363.327 485.722 288.065 491.743 205.399C493.151 122.839 572.134 49.5921 658.685 56.0084C745.156 57.6376 821.704 139.826 814.941 229.643C813.162 319.372 727.304 398.632 633.523 391.443C539.841 389.504 457.331 300.329 464.81 203.379C466.924 106.415 559.773 21.3065 660.698 29.1738C761.575 31.5108 850.126 127.501 841.874 231.663C839.438 335.826 739.632 426.864 631.51 418.278C523.426 415.58 428.894 312.675 437.876 201.358C440.642 90.0396 547.452 -7.026 662.711 2.33926C778.047 5.34861 878.505 115.226 868.806 233.684C865.682 352.188 751.975 455.212 629.497 445.113C506.98 441.756 400.476 324.95 410.943 199.338C414.374 73.6496 535.093 -35.3247 664.724 -24.4953C794.506 -20.7883 906.885 102.936 895.739 235.704C891.913 368.549 764.359 483.551 627.484 471.947C490.478 467.941 372.149 337.218 384.01 197.318C388.182 57.281 522.681 -63.6535 666.737 -51.3299C810.926 -46.9779 935.316 90.6774 922.673 237.724C918.18 384.949 776.696 511.835 625.471 498.782C474.074 494.069 343.717 349.503 357.077 195.297C361.899 40.9161 510.362 -91.9859 668.749 -78.1645C827.362 -73.1559 963.707 78.4138 949.607 239.745C944.433 401.362 789.033 540.119 623.458 525.617C457.707 520.2 315.256 361.825 330.144 193.277C335.636 24.4634 498.023 -120.233 670.762 -104.999C843.764 -99.2315 992.144 66.0643 976.538 241.765C970.716 417.739 801.364 568.454 621.445 552.451C441.234 546.374 286.877 374.101 303.211 191.257"
            stroke="#ECECEC"
            stroke-width="3"
            stroke-linecap="round"
          />
          <circle cx="12.5" cy="19.5" r="12.5" fill="#C4C4C4" />
          <circle cx="84.5" cy="19.5" r="12.5" fill="#C4C4C4" />
          <circle cx="48.5" cy="19.5" r="12.5" fill="#C4C4C4" />
          <circle cx="12.5" cy="91.5" r="12.5" fill="#C4C4C4" />
          <circle cx="84.5" cy="91.5" r="12.5" fill="#C4C4C4" />
          <circle cx="48.5" cy="91.5" r="12.5" fill="#C4C4C4" />
          <circle cx="12.5" cy="55.5" r="12.5" fill="#C4C4C4" />
          <circle cx="84.5" cy="55.5" r="12.5" fill="#C4C4C4" />
          <circle cx="48.5" cy="55.5" r="12.5" fill="#C4C4C4" />
          <circle cx="140.5" cy="19.5" r="12.5" fill="#ECECEC" />
          <circle cx="212.5" cy="19.5" r="12.5" fill="#ECECEC" />
          <circle cx="176.5" cy="19.5" r="12.5" fill="#ECECEC" />
          <circle cx="140.5" cy="91.5" r="12.5" fill="#ECECEC" />
          <circle cx="212.5" cy="91.5" r="12.5" fill="#ECECEC" />
          <circle cx="176.5" cy="91.5" r="12.5" fill="#ECECEC" />
          <circle cx="140.5" cy="55.5" r="12.5" fill="#ECECEC" />
          <circle cx="212.5" cy="55.5" r="12.5" fill="#ECECEC" />
          <circle cx="176.5" cy="55.5" r="12.5" fill="#ECECEC" />
        </svg> */}
      </div>
    </div>
  );
}
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
  value,
  onChange,
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
        onChange={onChange}
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
export { LoginInfo, LoginSplitter, LoginInput, LoginButton };
