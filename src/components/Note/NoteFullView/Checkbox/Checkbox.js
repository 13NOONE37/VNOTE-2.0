import React from 'react';
import './Checkbox.css';

export default function Checkbox({ ...props }) {
  return (
    <div className="cbx">
      <input {...props} type="checkbox" className="taskCheckbox" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-check"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
}
