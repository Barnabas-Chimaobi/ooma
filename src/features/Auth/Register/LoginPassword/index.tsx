import React, {useEffect, useState} from 'react';
import {OmaCard, InputPrimary, KeyboardType} from '../../../../components';
import S from '../styles';
import {Text} from 'react-native';
import {setUserDetails} from '../../../../reducers';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../store';

const LoginPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const [password, setpassword] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(setUserDetails({password}));
      // Send Axios request here
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [password]);

  return (
    <OmaCard
      overTitle="Hello! Harriet"
      overStyle={S.overStyle}
      title="Please enter your Password"
      titleStyle={S.omaTitle}
      mainStyle={[S.omaMainStyle, {paddingTop: 15}]}
      otherProps={
        <>
          <InputPrimary
            leftLabel="password"
            placeholderTextColor="rgba(255, 255, 255, 0.9)"
            secureTextEntry
            inputContainerStyles={{paddingLeft: 13}}
            containerStyles={S.passwordInputContainerStyle}
            onChangeText={(text) => setpassword(text)}
          />
          <Text style={{textAlign: 'right', marginTop: 10}}>
            Forgot Password?
          </Text>
        </>
      }
    />
  );
};

export default LoginPassword;
