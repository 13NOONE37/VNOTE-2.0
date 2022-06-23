import React from 'react';
import Login from 'Pages/login/Login';
import Main from 'Pages/main/Main';

export default {
  guestPages: [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <h1>re</h1>,
    },
    {
      path: '/forget',
      element: <h1>re</h1>,
    },
  ],
  authPages: [
    {
      path: '/',
      element: <Main />,
    },
  ],
};
//todo all notes action like view search should be routed
