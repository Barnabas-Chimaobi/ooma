// Home naviagtion routes should live here
import React from 'react';
import {Register} from '../../features/Auth';
import {createStackNavigator} from '@react-navigation/stack';
import Fooders from './splash';
import Splash from './splash';
// import Branch from '../../features/Auth/Register/regionBranch/branch'
import Region from '../../features/Auth/Register/regionBranch/region';
const {Navigator, Screen} = createStackNavigator();

const index = () => (
  <Navigator headerMode="none" initialRouteName="MyCart">
    <Screen name="Splash" component={Splash} />
    <Screen name="Region" component={Region} />
    {/* <Screen name="Register" component={Register} /> */}
  </Navigator>
);

export default index;
