import React, {useState, useEffect} from 'react';
// import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Dish,
  Cart,
  MenuPlanIntro,
  Detail,
  Menu,
  MenuHistory,
} from '../../features/App';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {Navigator, Screen} = createStackNavigator();

export default function index() {
  const [intro, setIntro] = useState('');

  const getIntro = async () => {
    let newIntro = await AsyncStorage.getItem('intro');
    setIntro(newIntro);
    console.log(intro, 'intro=======');
  };

  useEffect(() => {
    getIntro();
  }, []);

  return (
    <Navigator
      headerMode="none"
      initialRouteName={intro === 'disable' ? Menu : MenuPlanIntro}>
      {/* {intro === 'disable' ? null : (
        <Screen name="Intro" component={MenuPlanIntro} />
      )} */}
      <Screen name="Menu" component={Menu} />
      <Screen name="Detail" component={Detail} />
      <Screen name="Cart" component={Cart} />
      <Screen name="Dish" component={Dish} />
      <Screen name="MenuHistory" component={MenuHistory} />
    </Navigator>
  );
}

// export default index;
