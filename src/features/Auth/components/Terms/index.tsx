import React from 'react';
import {Text, View} from 'react-native';
import S from './styles';

const Terms = () => {
  return (
    // <View style={{alignSelf: 'flex-start', maxWidth: '90%'}}>
    <Text style={S.mainStyle}>
      By signing up, you have agreed to the <Text style={S.terms}>TERMS </Text>
      and <Text style={S.terms}>CONDITIONS</Text> of the App policy..
    </Text>
    // </View>
  );
};

export default Terms;
