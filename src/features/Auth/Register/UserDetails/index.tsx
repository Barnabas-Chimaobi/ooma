import React, {useState, useEffect} from 'react';
import {colors} from '../../../../colors';
import {OmaCard, InputPrimary, KeyboardType} from '../../../../components';
import S from '../styles';
import {View} from 'react-native';
import {setUserDetails} from '../../../../reducers';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../store';

const UserDetails = () => {
  const {firstName: first, lastName: last} = useSelector(
    (state: RootState) => state.auth,
  );

  const dispatch: AppDispatch = useDispatch();

  const [state, setState] = useState({
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    secureText: true,
    secureText1: true,
  });

  const {
    password,
    confirmPassword,
    firstName,
    lastName,
    secureText,
    secureText1,
  } = state;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        setUserDetails({firstName, lastName, password, confirmPassword}),
      );
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [firstName, lastName, password, confirmPassword]);

  console.log(firstName, 'firstName', first);
  console.log(lastName, 'lastName', last);

  return (
    <OmaCard
      overTitle="Your profile is good to go!"
      overStyle={S.overStyle}
      title="Set up your account"
      titleStyle={S.omaTitle}
      subTitle="Enter your secret passcode. Remember, your password is best kept to yourself alone."
      subStyle={S.omaSubTitle}
      mainStyle={[S.omaMainStyle, {paddingTop: 15}]}
      otherProps={
        <>
          <InputPrimary
            leftLabel="password"
            placeholderTextColor={colors.offWhite}
            secureTextEntry={secureText}
            inputContainerStyles={{paddingLeft: 13}}
            containerStyles={[
              S.passwordInputContainerStyle,
              {marginBottom: 25},
            ]}
            keyboardType={KeyboardType.phone}
            maxLength={11}
            rightIcon
            iconName={secureText ? 'eye-slash' : 'eye'}
            iconColor={colors.offWhite}
            iconSize={17}
            rightIconPress={() => setState({...state, secureText: !secureText})}
            onChangeText={(password) => setState({...state, password})}
          />
          <InputPrimary
            leftLabel="confirm password"
            placeholderTextColor={colors.offWhite}
            secureTextEntry={true}
            inputContainerStyles={{paddingLeft: 13}}
            containerStyles={S.passwordInputContainerStyle}
            keyboardType={KeyboardType.phone}
            maxLength={11}
            rightIcon
            iconName={secureText1 ? 'eye-slash' : 'eye'}
            iconColor={colors.offWhite}
            iconSize={17}
            rightIconPress={() =>
              setState({...state, secureText1: !secureText1})
            }
            onChangeText={(confirmPassword) =>
              setState({...state, confirmPassword})
            }
          />
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              marginHorizontal:10,
              justifyContent: 'space-between',
            }}>
            <InputPrimary
              title="First Name"
              titleStyle={{
                fontSize: 12,
                fontWeight: 'bold',
                backgroundColor: colors.white,
                paddingVertical: 10,
                backfaceVisibility: 'visible',
                zIndex: 10,
              }}
              value={firstName}
              containerStyles={[S.passwordInputContainerStyle, {width: '47%'}]}
              onChangeText={(firstName) => setState({...state, firstName})}
            />
            <InputPrimary
              title="Last Name"
              titleStyle={{
                fontSize: 12,
                fontWeight: 'bold',
                backgroundColor: colors.white,
                paddingVertical: 10,
                backfaceVisibility: 'visible',
                position: 'relative',
                zIndex: 10
              }}
              value={lastName}
              containerStyles={[S.passwordInputContainerStyle, {width: '47%'}]}
              onChangeText={(lastName) => setState({...state, lastName})}
            />
          </View>
        </>
      }
    />
  );
};

export default UserDetails;
