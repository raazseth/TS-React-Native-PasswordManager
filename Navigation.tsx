import React, {useEffect} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Add from './Screens/Add';
import Update from './Screens/Update';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Add" component={Add} />
      <Stack.Screen name="Update" component={Update} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export {MainStackNavigator};
