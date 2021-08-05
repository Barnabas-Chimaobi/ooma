import React, {useState} from 'react';
import S from './styles';
import {Divider} from 'react-native-elements';
import {Text, View} from 'react-native';
import {Button, Overlay} from '../../../../../components';

interface IProps {
  overlayStyle?: object;
  children: any;
  isVisible: boolean;
  title?: string;
  buttonTitle?: string;
  onPress?: () => void;
  onBackdropPress?: () => void;
}

const Modal = ({
  overlayStyle,
  children,
  isVisible,
  title,
  onPress,
  onBackdropPress,
  buttonTitle,
}: IProps) => {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      overlayStyle={[S.overlayStyle, overlayStyle]}
      child={
        <View>
          <Text style={S.textStyle}>{title}</Text>
          <Divider />
          <View style={S.childrenStyle}>{children}</View>
        </View>
      }
    />
  );
};

export default Modal;
