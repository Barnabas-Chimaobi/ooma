// Home naviagtion routes should live here
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Checkout,
  MyCart,
  CartIntro,
  Wallet,
  Dish,
  Home,
} from '../../features/App';
const {Navigator, Screen} = createStackNavigator();

const index = () => (
  <Navigator headerMode="none" initialRouteName="MyCart">
    <Screen name="MyCart" component={MyCart} />
    <Screen name="CartIntro" component={CartIntro} />
    <Screen name="Checkout" component={Checkout} />
    <Screen name="Wallet" component={Wallet} />
    <Screen name="Dish" component={Dish} />
    {/* <Screen name="Home" component={Home} /> */}
  </Navigator>
);

export default index;
