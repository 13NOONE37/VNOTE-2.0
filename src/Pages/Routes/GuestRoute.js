import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import { Route, Navigate } from 'react-router-dom';

export default function GuestRoute(props) {
  const { isLogged } = useContext(AppContext);

  // if (isLogged == null) {
  // return <h1>Loading</h1>;
  // }
  if (!isLogged) {
    return <Route {...props} />;
  }
  return Navigate('/');
  // <Navigate to="/" />;
}
