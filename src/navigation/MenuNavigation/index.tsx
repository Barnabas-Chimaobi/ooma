import React from 'react';
// import {View, Text} from 'react-native';
const {Navigator, Screen} = createStackNavigator();
import {createStackNavigator} from '@react-navigation/stack';
import {
  Dish,
  Cart,
  MenuPlanIntro,
  Detail,
  Menu,
  MenuHistory,
} from '../../features/App';

const index = () => (
  <Navigator headerMode="none" initialRouteName="Intro">
    <Screen name="Intro" component={MenuPlanIntro} />
    <Screen name="Menu" component={Menu} />
    <Screen name="Detail" component={Detail} />
    <Screen name="Cart" component={Cart} />
    <Screen name="Dish" component={Dish} />
    <Screen name="MenuHistory" component={MenuHistory} />
  </Navigator>
);

export default index;
