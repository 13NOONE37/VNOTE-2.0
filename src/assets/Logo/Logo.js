import React from 'react';
import './Logo.css';
export default function Logo({ forceDark }) {
  return (
    <div className={`logo ${forceDark && 'darkLogoForced'}`}>
      <span className="rectSpan">to_</span>
      <span className="blankSpan">String()</span>
    </div>
  );
}
