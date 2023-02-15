import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from 'components/Loading/Loading';
import VerifyEmail from 'Pages/VerifyEmail/VerifyEmail';

export default function AuthRoute() {
  const { isLogged, userInfo } = useContext(AppContext);

  if (isLogged == null) return <Loading />;
  if (userInfo?.email != null && userInfo?.emailVerified === false)
    return <VerifyEmail />;
  return isLogged ? <Outlet /> : <Navigate to={'/login'} />;
}
