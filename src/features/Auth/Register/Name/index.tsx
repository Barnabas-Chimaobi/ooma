import React, {useState} from 'react';
import {OmaCard, InputPrimary} from '../../../../components';
import S from '../styles';

const Name = () => {
  return (
    <OmaCard
      overTitle="Your profile is good to go!"
      overStyle={S.overStyle}
      title="Enter Name"
      titleStyle={S.omaTitle}
      mainStyle={[S.omaMainStyle, {paddingTop: 15}]}
      otherProps={
        <InputPrimary
          title="Your Name"
          inputContainerStyles={S.nameInputContainerStyle}
          titleStyle={S.nameInputTitleStyle}
        />
      }
    />
  );
};

export default Name;
