import React, {FC, useState} from 'react';
import {CheckBox} from 'react-native-elements';

interface IProps {
  onPress?: () => void;
  title?: string;
  circle?: boolean;
  containerStyle?: object
  checkedIcon?: string,
  checked: any
}

const CheckBoxComponent: FC<IProps> = ({onPress, title, circle, containerStyle, checked}) => {
  console.log(checked)
  // const [state, setstate] = useState({checked: false});
  return (
    <CheckBox 
      title={title}
      checkedIcon={circle ? 'circle' : 'check'}
      uncheckedIcon={circle ? 'circle' : 'square-o'}
      checked={checked}
      textStyle={{marginLeft: 40, fontWeight: "normal"}}
      onPress={onPress}
      checkedColor="green"
      containerStyle={[{backgroundColor: 'white', borderWidth: 0}, containerStyle]}
    />
  );
};

export {CheckBoxComponent as CheckBox1};
