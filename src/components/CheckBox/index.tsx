import React, {FC, useState} from 'react';
import {CheckBox} from 'react-native-elements';

interface IProps {
  onPress?: () => {};
  title?: string;
  circle?: boolean;
  containerStyle?: object;
  checkedIcon?: string;
  props?: any;
  value: any;
}

const CheckBoxComponent: FC<IProps> = ({
  onPress,
  title,
  circle,
  containerStyle,
  props,
  value,
}) => {
  const [state, setstate] = useState({checked: false});
  const getCheckName = (item: any, newValue: any) => {
    console.log(item, newValue, 'itemmm');
    props(item, newValue);
  };

  return (
    <CheckBox
      title={title}
      checkedIcon={circle ? 'circle' : 'check'}
      uncheckedIcon={circle ? 'circle' : 'square-o'}
      checked={state.checked}
      textStyle={{marginLeft: 40, fontWeight: 'normal'}}
      onPress={() => {
        setstate({checked: !state.checked});
        getCheckName(title, value);
      }}
      checkedColor="green"
      containerStyle={[
        {backgroundColor: 'white', borderWidth: 0},
        containerStyle,
      ]}
    />
  );
};

export {CheckBoxComponent as CheckBox};
