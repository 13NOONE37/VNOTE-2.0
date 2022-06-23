import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthRoute() {
  const { isLogged } = useContext(AppContext);
  if (isLogged == null) return <h1>Loading...</h1>;
  return isLogged ? <Outlet /> : <Navigate to={'/login'} />;
}
