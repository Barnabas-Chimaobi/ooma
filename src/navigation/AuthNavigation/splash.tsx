import React, {useEffect, useState} from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../store';
import {ooma, oomaNew, nologo} from '../../assets';

const Splash = () => {
  const [branch, setBranch] = React.useState('');
  const navigation = useNavigation();
  const {token} = useSelector((state: RootState) => state.auth);

  const bootstrapAsync = async () => {
    // let userToken: any;
    try {
      let userToken: any = await AsyncStorage.getItem('token');
      console.log(userToken, 'asyncbranchhhsssss');
      console.log(userToken, 'userssssss');

      if (userToken != null) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Register');
      }
      console.log('runnniinngggg');
    } catch (e) {
      // Restoring token failed
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // this.componentDidMount();
      bootstrapAsync();
    });
  }, []);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      {/* {branch != null ? navigation.navigate('BottomNavigator') : null} */}
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <Image
        resizeMode="contain"
        source={oomaNew}
        style={{height: 80, width: 600, alignSelf: 'center', marginTop: '80%'}}
      />
      <Image
        resizeMode="contain"
        source={nologo}
        style={{height: 80, width: 600, alignSelf: 'center', marginTop: 10}}
      />
    </View>
  );
};

export default Splash;
