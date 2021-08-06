import React from 'react';
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
      titleStyle={S.omaTitle}
      subTitle="Verify your phone number. A message will be sent to you."
      subStyle={S.omaSubTitle}
      mainStyle={S.omaMainStyle}
      otherProps={
        <>
          <BaseInput
            value={number}
            keyboardType={BaseKeyBoardType.phonePad}
            autoFocus={true}
            inputStyle={{backgroundColor: colors.white, color: colors.black}}
            editable={false}
          />
        </>
      }
    />
  );
};

export default ConfirmPhone;
