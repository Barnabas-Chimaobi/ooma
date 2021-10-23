import React, {useEffect, useState} from 'react';
import {OmaCard, InputPrimary, KeyboardType} from '../../../../components';
import S from '../styles';
import {Text, View} from 'react-native';
import {setUserDetails} from '../../../../reducers';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../store';
import {
  createMenuItemOrder,
  getDeliveryAddress,
  createMenuItemOrderDetail,
  createMenuPlanOrder,
  getMenuitemCart,
  getProfile,
} from '../../../../FetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const [password, setpassword] = useState('');
  const [username, setUserName] = useState('');

  const getProfiles = async () => {
    const userId = await AsyncStorage.getItem('userId');
    //  const parseAddress = JSON.parse(adress);
    const user = await getProfile(userId);
    console.log(user, 'user======ssserrr===');
    setUserName(user?.data?.firstName);
  };

  useEffect(() => {
    getProfiles();
    const delayDebounceFn = setTimeout(() => {
      dispatch(setUserDetails({password}));
      // Send Axios request here
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [password]);

  return (
    <OmaCard
      overTitle={username !== undefined ? `Hello ${username}` : 'Hello User'}
      overStyle={S.overStyle}
      title="Please enter your Password"
      titleStyle={S.omaTitle}
      mainStyle={[S.omaMainStyle, {paddingTop: 15}]}
      otherProps={
        <>
          <View style={{marginTop: 10, width: '95%', alignSelf: 'center'}}>
            <InputPrimary
              leftLabel="password"
              placeholderTextColor="rgba(255, 255, 255, 0.9)"
              secureTextEntry
              inputContainerStyles={{paddingLeft: 13}}
              containerStyles={S.passwordInputContainerStyle}
              onChangeText={(text) => setpassword(text)}
            />
          </View>

          {/* <Text style={{textAlign: 'right', marginTop: 10}}>
            Forgot Password?
          </Text> */}
        </>
      }
    />
  );
};

export default LoginPassword;
