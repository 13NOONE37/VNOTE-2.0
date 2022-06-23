import React from 'react';
import Login from 'Pages/login/Login';
import Main from 'Pages/main/Main';

export default [
  {
    path: '/',
    element: <Main />,
    protection: 'auth',
  },
  {
    path: '/login',
    element: <Login />,
    protection: 'guest',
  },
];
