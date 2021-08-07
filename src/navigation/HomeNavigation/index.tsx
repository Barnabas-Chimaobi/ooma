import React from 'react';
import {Home} from '../../features/App';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigator from '../BottomTabNavigator';
import {
  NavigationContainer,
  NavigatorScreenParams,
  DefaultTheme,
  DarkTheme,
  RouteProp,
} from '@react-navigation/native';
const {Navigator, Screen} = createStackNavigator();
const MainStack = createStackNavigator();

const MenuStackScreen = () => (
  <Navigator headerMode="none" initialRouteName="BottomNavigator">
    <Screen name="BottomNavigator" component={BottomNavigator} />
  </Navigator>
);

export default MenuStackScreen;
