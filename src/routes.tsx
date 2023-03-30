import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Menu from './pages/Menu';
import BedRidden from './pages/BedRidden';
// import LeftOver from './pages/LeftOver';
import Registration from './pages/Registration';
import StatusCheck from './pages/StatusCheck';
import VaccinationLocations from './pages/VaccinationLocations';
import FrequentDoubts from './pages/FrequentDoubts';
import UpdateRegistration from './pages/UpdateRegistration';

const Routes: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BedRidden"
          component={BedRidden}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="LeftOver"
          component={LeftOver}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StatusCheck"
          component={StatusCheck}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VaccinationLocations"
          component={VaccinationLocations}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FrequentDoubts"
          component={FrequentDoubts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateRegistration"
          component={UpdateRegistration}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
