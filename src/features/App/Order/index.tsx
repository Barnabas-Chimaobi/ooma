import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  TouchableWithoutFeedback,
  View,
  BackHandler,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import CurrentOrder from './Current';
import OrderHistory from './History';
import UpcomingOrder from './Upcoming';
import OrderDetails from './OrderDetails';

const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const OrderTab = () => {
  const Current = () => <CurrentOrder />;

  const Upcoming = () => <UpcomingOrder />;

  const History = () => <OrderHistory />;

  return (
    <>
      <View style={{backgroundColor: '#303030'}}>
        <Text
          style={{
            color: 'white',
            padding: 20,
            paddingLeft: 40,
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          My Order
        </Text>
      </View>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#fff',
          inactiveTintColor: 'rgba(255, 255, 255, 0.5)',
          indicatorStyle: {
            height: 6,
            backgroundColor: '#fff',
          },
          labelStyle: {
            fontSize: 12,
            marginBottom: 0,
            fontFamily: 'Muli-Bold',
          },
          tabStyle: {
            paddingBottom: 0,
            paddingTop: 0,
            borderTopWidth: 0,
            borderTopColor: '#fff',
          },
          style: {
            borderTopWidth: 0,
            borderTopColor: '#fff',
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: '#303030',
          },
        }}>
        <Tab.Screen name="Current" component={Current} />
        <Tab.Screen name="Upcoming" component={Upcoming} />
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
    </>
  );
};

// function OrderStack({}) {
//   return (
//     <Stack.Navigator
//       initialRouteName={'Current'}
//       headerMode="screen"
//       screenOptions={{
//         headerTintColor: 'black',
//         headerStyle: {backgroundColor: 'white'},
//       }}>
//       <Stack.Screen
//         name="My Order"
//         component={OrderTab}
//         options={{
//           title: 'My Order',
//         }}
//       />
//     </Stack.Navigator>
//   );
// }
export {OrderDetails};
export default OrderTab;
