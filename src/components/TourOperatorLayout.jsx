import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

const TourOperatorLayout = () => {
  const {  token, setToken } = useStateContext();

  

  if (!token) {
    return <Navigate to="/Login" />;
  }


  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post('/logout').then(() => {
     
      setToken(null);
    });
  }
  
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default TourOperatorLayout;
