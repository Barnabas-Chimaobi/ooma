import React, {FC} from 'react';
import {View, Text} from 'react-native';
import S from './styles';

interface IProps {
  labelText?: string;
  labelStyle?: object;
}

const Label: FC<IProps> = ({labelText, labelStyle}) => {
  return (
    <View style={[S.labelMain, labelStyle]}>
      <Text style={S.labelText}>{labelText}</Text>
    </View>
  );
};

export default Label;
