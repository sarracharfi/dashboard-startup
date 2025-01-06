// components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { Mycontext } from '../App';

const PrivateRoute = ({ element, ...rest }) => {
  const { isLogin } = useContext(Mycontext);

  return (
    <Route
      {...rest}
      element={isLogin ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
