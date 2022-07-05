import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logo.css';
export default function Logo({ forceDark }) {
  const navigate = useNavigate();
  return (
    <div
      className={`logo ${forceDark && 'darkLogoForced'}`}
      onClick={() => navigate('/')}
    >
      <span className="rectSpan">to_</span>
      <span className="blankSpan">String()</span>
    </div>
  );
}
