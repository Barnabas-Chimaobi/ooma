import React from 'react';
import {Overlay} from 'react-native-elements';

interface IProps {
  overlayStyle?: object;
  child?: any;
  isVisible: boolean;
  onBackdropPress?: () => void;
}

const Modal = ({overlayStyle, child, isVisible, onBackdropPress}: IProps) => {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      overlayStyle={[overlayStyle]}>
      {child}
    </Overlay>
  );
};

export default Modal;
