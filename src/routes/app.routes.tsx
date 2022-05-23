// Apenas usuário logados podem acessar
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';

const Stack = createNativeStackNavigator();

function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='Dashboard' component={Dashboard} />
    </Stack.Navigator>
  );
}

export default AppRoutes;