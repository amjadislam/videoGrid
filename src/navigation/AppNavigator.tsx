import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UploadScreen, ResultScreen, RootStackParamList } from '../screens';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Upload">
      <Stack.Screen name="Upload" component={UploadScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator; 