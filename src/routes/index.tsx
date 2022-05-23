import React from 'react';
import { View } from 'react-native';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes = () => {
  const isAuthenticated = false;
  return (
    isAuthenticated ? <AppRoutes /> : <AuthRoutes />
  );
}

export default Routes;
