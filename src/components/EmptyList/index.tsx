import React from 'react';
import {View, Image, Text} from 'react-native';
import {Button, Type as ButtonType} from '../../components/Button';
import S from './styles';

interface IProps {
  image: any;
  message: string;
  title: string;
  onPress?: () => void;
  style: any;
}

const EmptyList = ({image, message, title, onPress, style}: IProps) => {
  return (
    <View style={S.main}>
      <Image source={image} style={style} />
      <Text style={S.message}>{message}</Text>
      <Button
        type={ButtonType.solid}
        title={title}
        buttonStyle={S.buttonStyle}
        titleStyle={S.titleStyle}
        onPress={onPress}
      />
    </View>
  );
};

export default EmptyList;
