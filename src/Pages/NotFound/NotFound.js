import React from 'react';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notFoundBox">
      <h1 className="notFoundBox--h1">404</h1>
      <h2 className="notFoundBox--h2">Not found</h2>
      <button className="notFoundBox--button">Go back</button>
    </div>
  );
}
