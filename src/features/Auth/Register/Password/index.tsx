import React from 'react';
import {OmaCard, InputPrimary, KeyboardType} from '../../../../components';
import S from '../styles';

const Password = () => {
  return (
    <OmaCard
      overTitle="You’re almost there."
      overStyle={S.overStyle}
      title="Create Password"
      titleStyle={S.omaTitle}
      subTitle="Enter your secret passcode. Remember, your password is best kept to yourself alone."
      subStyle={S.omaSubTitle}
      mainStyle={[S.omaMainStyle, {paddingTop: 15}]}
      otherProps={
        <>
          <InputPrimary
            leftLabel="password"
            placeholderTextColor="rgba(255, 255, 255, 0.9)"
            secureTextEntry
            inputContainerStyles={{paddingLeft: 13}}
            containerStyles={[
              S.passwordInputContainerStyle,
              {marginBottom: 25},
            ]}
            keyboardType={KeyboardType.phone}
            maxLength={11}
          />
          <InputPrimary
            leftLabel="confirm password"
            placeholderTextColor="rgba(255, 255, 255, 0.9)"
            secureTextEntry
            inputContainerStyles={{paddingLeft: 13}}
            containerStyles={S.passwordInputContainerStyle}
            keyboardType={KeyboardType.phone}
            maxLength={11}
          />
        </>
      }
    />
  );
};

export default Password;
