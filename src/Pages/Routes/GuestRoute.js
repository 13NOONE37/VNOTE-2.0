import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from 'components/Loading/Loading';

export default function GuestRoute() {
  const { isLogged } = useContext(AppContext);
  if (isLogged == null) return <Loading />;

  return !isLogged ? <Outlet /> : <Navigate to={'/'} />;
}
