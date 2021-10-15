import React from 'react';
import {View} from 'react-native';
import {OmaCard, BaseInput, BaseKeyBoardType} from '../../../../components';
import S from '../styles';
import {colors} from '../../../../colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store';

const ConfirmPhone = () => {
  let {number} = useSelector((state: RootState) => state.auth);
  // console.log(number, 'num');
  number = number && number.substr(3);
  number = '0' + number;
  return (
    <OmaCard
      title="Is this your phone number?"
      titleStyle={{
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
        fontFamily: 'Montserrat',
      }}
      subTitle="Verify your phone number. A message will be sent to you."
      subStyle={S.omaSubTitle}
      mainStyle={S.omaMainStyle}
      otherProps={
        <>
          <View style={{marginBottom: -30}}>
            <BaseInput
              value={number}
              keyboardType={BaseKeyBoardType.phonePad}
              autoFocus={true}
              inputStyle={{
                backgroundColor: colors.t,
                color: colors.black,
                width: '95%',
                alignSelf: 'center',
                marginLeft: 8,
                borderRadius: 10,
              }}
              editable={false}
            />
          </View>
        </>
      }
    />
  );
};

export default ConfirmPhone;
