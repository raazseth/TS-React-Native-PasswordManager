import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainStackNavigator} from './Navigation';
import {StoreProvider} from './Helpers/Store';

const App = () => {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
