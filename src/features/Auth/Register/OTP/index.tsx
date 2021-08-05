import React, {useState, useEffect} from 'react';
import {OmaCard} from '../../../../components';
import CodeInput from 'react-native-confirmation-code-input';
import S from '../styles';
import {setUserDetails} from '../../../../reducers';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../store';

const OTP = () => {
  const [state, setState] = useState({code: ''});
  const {code} = state;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(setUserDetails({code}));
    }, 100);
    return () => clearTimeout(delayDebounceFn);
  }, [code]);

  console.log(code, 'code');
  return (
    <OmaCard
      title="Enter OTP"
      titleStyle={[S.omaTitle, {fontSize: 16,margin:10}]}
      subTitle="A message has been sent to your number. Please enter the six digits sent to you."
      subStyle={S.omaSubTitle}
      mainStyle={S.omaMainStyle}
      otherProps={
        <CodeInput
          inputPosition="full-width"
          codeLength={6}
          size={45}
          space={1}
          secureTextEntry
          keyboardType="number-pad"
          autoFocus={false}
          onFulfill={(code: any) => {
            setState({code});
          }}
          codeInputStyle={S.codeInputStyle}
          containerStyle={S.codeInputContainerStyle}
          cellBorderWidth={1}
          inactiveColor="#B4B4B4"
          activeColor="#000"
        />
      }
    />
  );
};

export default OTP;
