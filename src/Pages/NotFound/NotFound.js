import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="notFoundBox">
      <h1 className="notFoundBox--heading notFoundBox--heading__1">404</h1>
      <h2 className="notFoundBox--heading notFoundBox--heading__2">
        Not found
      </h2>
      <button className="notFoundBox--button" onClick={() => navigate('/')}>
        Go back
      </button>
    </div>
  );
}
