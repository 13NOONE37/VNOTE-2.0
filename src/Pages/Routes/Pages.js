import React from 'react';
import Login from 'Pages/login/Login';
import Main from 'Pages/main/Main';
import LoginForm from 'Pages/login/LoginForm';
import RegisterForm from 'Pages/login/RegisterForm';
import ForgetForm from 'Pages/login/ForgetForm';

export default {
  guestPages: [
    {
      path: '/login',
      element: <Login />,
      subPages: [
        {
          path: '/login/',
          element: <LoginForm />,
        },
        {
          path: '/login/register',
          element: <RegisterForm />,
        },
        {
          path: '/login/forget',
          element: <ForgetForm />,
        },
      ],
    },
  ],
  authPages: [
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/:category',
      element: <Main />,
    },
  ],
};
