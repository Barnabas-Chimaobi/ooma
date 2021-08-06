import React from 'react';
import {
  Explore,
  Dish,
  Order,
  OrderDetails,
  SelectedCategory,
  Filter,
  AllMenuPlanByCategory,
  Detail,
  SearchMenuitemandPlan,
  Cart1,
} from '../../features/App';
import {createStackNavigator} from '@react-navigation/stack';
const {Navigator, Screen} = createStackNavigator();

export type ExploreStackParamList = {
  Explorer: undefined;
  Dish: undefined;
  Order: undefined;
  SelectedCategory: undefined;
  AllMenuPlanByCategory: undefined;
  Detail: undefined;
  SearchMenuitemandPlan: undefined;
  // selectedCategory: undefined
};

const ExploreStackScreen = () => (
  <Navigator headerMode="none" initialRouteName="Explorer">
    <Screen name="Explorer" component={Explore} />
    <Screen name="Dish" component={Dish} />
    <Screen name="Order" component={Order} />
    <Screen name="OrderDetails" component={OrderDetails} />
    <Screen name="SelectedCategory" component={SelectedCategory} />
    <Screen name="Filter" component={Filter} />
    <Screen name="MenuPlanByCategory" component={AllMenuPlanByCategory} />
    <Screen name="Detail" component={Detail} />
    <Screen name="SearchMenuitemandPlan" component={SearchMenuitemandPlan} />
    <Screen name="Cart1" component={Cart1} />

    {/* <Screen name="selectedCategory" component={} /> */}
  </Navigator>
);

export default ExploreStackScreen;
