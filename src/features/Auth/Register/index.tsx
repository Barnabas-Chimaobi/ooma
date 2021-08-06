import React, {useRef, useState} from 'react';
import {View, ImageBackground, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import Wizard from 'react-native-wizard';
import Terms from '../components/Terms';
import {Logo, Button, ButtonType, ShowMessage, type} from '../../../components';
import S from './styles';
import {factoryStyles as IS} from './styles';
import Name from './Name';
import PhoneNumber from './PhoneNumber';
import Password from './Password';
import OTP from './OTP';
import LoginPassword from './LoginPassword';
import ConfirmPhone from './ConfirmPhone';
import UserDetails from './UserDetails';

import {RootState, AppDispatch} from '../../../store';
import {signIn} from '../../../reducers';
import {AuthImage} from '../../../assets';
import api from '../../../api';
import {setUserDetails} from '../../../reducers';
import {useNavigation} from '@react-navigation/native';

const registerStepList = [
  {
    content: <ConfirmPhone />,
  },
  {
    content: <OTP />,
  },
  {
    content: <UserDetails />,
  },
];

const loginStepList = [{content: <LoginPassword />}, {}];

const entryStepList = [
  {
    content: <PhoneNumber />,
  },
  {},
];

const Register = () => {
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  const {
    number,
    password,
    confirmPassword,
    firstName,
    lastName,
    code,
    hash,
  } = useSelector((state: RootState) => state.auth);
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [route, setroute] = useState('');
  const [mockStep, setmockStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    // console.log(number, password, 'login');
    try {
      setLoading(true);
      const loginUser = await api.post(`/users/login?`, {
        username: number,
        password,
      });
      const {token} = loginUser?.data?.data;
      console.log(token, 'token');
      if (token != false) {
        navigation.navigate('Region', {newToken: token});
        // await AsyncStorage.setItem('token', token);
        setLoading(false);
        // dispatch(signIn());
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const verifyNumber = async () => {
    try {
      setLoading(true);
      if (number.length >= 13) {
        console.log(number.length, 'number1');
        const verifynumber = await api.get(`/users/exist?emailPhone=${number}`);
        const {isAuser} = verifynumber?.data?.data;
        if (isAuser) {
          setLoading(false);
          setroute('login');
          setmockStep(1);
        } else {
          setLoading(false);
          setroute('register');
          setmockStep(0);
        }
        return;
      } else {
        setLoading(false);
        console.log(number, 'number');
        ShowMessage(type.INFO, 'Phone number must be at least 11 characters');
      }
    } catch (err) {
      setLoading(false);
      ShowMessage(type.ERROR, err);
    }
  };

  const sendOtp = async () => {
    // console.log(number, 'code');
    try {
      setLoading(true);
      const otp = await api.get(`/users/sendOtp?phoneNumber=${number}`);
      const {data} = otp?.data;
      data && dispatch(setUserDetails({hash: data})) && wizard.current.next();
      console.log(otp, 'otp');
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // const verifyOtp = async () => {
  //   // console.log(number, 'hash');
  //   try {
  //     setLoading(true);
  //     const verify = await api.get(
  //       `/users/verifyOtp?phoneNumber=${number}&hash=${hash}&otp=${code}`,
  //     );
  //     const {status} = verify?.data;
  //     status && setLoading(false) && wizard.current.next();
  //     console.log(verify, 'verig');
  //   } catch (err) {
  //     setLoading(false);
  //     console.log(err);
  //   }
  // };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const verify = await api.get(
        `/users/verifyOtp?phoneNumber=${number}&hash=${hash}&otp=${code}`,
      );
      const {status} = verify?.data;
      console.log(verify, status, verify.data, 'verig');
      if (status) {
        setLoading(false);
        wizard.current.next();
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const register = async () => {
    if (password === confirmPassword) {
      try {
        setLoading(true);
        const registerUser = await api.post(`/users/create?`, {
          username: number,
          lastName,
          firstName,
          phoneNumber: number,
          password,
        });
        console.log(registerUser, 'register');
        registerUser?.data?.status && login();
      } catch (err) {
        setLoading(false);
        // ShowMessage(type.ERROR, err.response);
        console.log(err.response, 'reeee');
      }
    } else {
      setLoading(false);
      ShowMessage(type.ERROR, 'please confirm password');
      console.log('please confirm password');
    }
  };

  const stepList =
    route == 'register'
      ? registerStepList
      : route == 'login'
      ? loginStepList
      : entryStepList;
  // console.log(number, lastName, firstName, number, password);
  return (
    <ImageBackground source={AuthImage} style={{flex: 1}}>
      {!isFirstStep && route != 'login' && (
        <Button
          buttonStyle={S.backButtonStyle}
          iconName="arrow-left"
          iconSize={18}
          iconColor="#05944F"
          onPress={() => wizard.current.prev()}
        />
      )}
      <Logo logoStyle={S.logoStyle} large />
      <View style={S.registerBody}>
        <Wizard
          contentContainerStyle={{width: '100%'}}
          ref={wizard}
          steps={stepList}
          isFirstStep={(val) => setIsFirstStep(val)}
          isLastStep={(val) => setIsLastStep(val)}
          onNext={() => {
            console.log('Next Step Called');
          }}
          onPrev={() => {
            console.log('Previous Step Called');
          }}
          currentStep={({currentStep, isLastStep, isFirstStep}) => {
            setCurrentStep(currentStep);
          }}
        />
        {currentStep == 3 || route == 'login' ? <View /> : <Terms />}
        {loading ? (
          <ActivityIndicator color="#05944F" size="large" />
        ) : (
          <Button
            title={
              isFirstStep
                ? 'Proceed'
                : isLastStep
                ? 'Done'
                : currentStep == 3
                ? 'Continue'
                : 'Next'
            }
            // disabled={isLastStep}
            type={ButtonType.solid}
            onPress={async () => {
              isFirstStep && verifyNumber();
              if (route == 'register') {
                isFirstStep && sendOtp();
                currentStep == 1 && verifyOtp();
                isLastStep && register();
                return;
              }
              route == 'login' && login();
            }}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
              borderRadius: 5,
            }}
          />
        )}
        <View style={{flexDirection: 'row', margin: 18}}>
          {stepList.map((val, index) => (
            <View
              key={'step-indicator-' + index}
              style={IS(index, mockStep || currentStep).indicatorStyle}
            />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Register;
