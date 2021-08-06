import * as React from 'react';
import {Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MenuNavigation from '../MenuNavigation';
import Cart from '../MyCartNavigation';
import {
  Home,
  Explore,
  MenuPlanIntro as MenuPlan,
  CartIntro as MyCart,
  More,
} from '../../features/App';

// import MyCart from '../MyCartNavigation';
// import More from '../MoreNavigation';

import {
  homeIcon,
  exploreIcon,
  menuIcon,
  cartIcon,
  moreIcon,
  newCart,
  newMore,
  newPlan,
} from '../../assets';

// function Explore() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Explore!</Text>
//     </View>
//   );
// }

function elevationShadowStyle(elevation: number) {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5 * elevation},
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
  };
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#26C867',
        inactiveTintColor: '#C4C4C4',
        style: {
          height: 65,
          paddingVertical: 8,
          borderTopColor: '#fff',
          backgroundColor: '#fff',
          ...elevationShadowStyle(5),
        },
        labelStyle: {
          fontFamily: 'Roboto',
          fontSize: 12,
          color: '#303030',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image
              source={homeIcon}
              style={{tintColor: color, width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({color, size}) => (
            <Image
              source={exploreIcon}
              style={{tintColor: color, width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu plan"
        component={MenuNavigation}
        options={{
          title: 'My profile',
          tabBarLabel: 'Menu plan',
          tabBarIcon: ({color, size}) => (
            <View>
              <Image
                source={newPlan}
                style={{tintColor: color, width: size, height: size}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="My Cart"
        component={Cart}
        options={{
          tabBarLabel: 'My Cart',
          tabBarIcon: ({color, size}) => (
            <Image
              source={newCart}
              style={{tintColor: color, width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({color, size}) => (
            <Image
              source={newMore}
              style={{tintColor: '#26C867', width: size, height: size}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
