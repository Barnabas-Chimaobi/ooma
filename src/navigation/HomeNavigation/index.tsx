import React from 'react';
import {Home} from '../../features/App';
import {createStackNavigator} from '@react-navigation/stack';
const {Navigator, Screen} = createStackNavigator();

const MenuStackScreen = () => (
  <Navigator headerMode="none" initialRouteName="Occupants">
    <Screen name="Home" component={Home} />
  </Navigator>
);

export default MenuStackScreen;
