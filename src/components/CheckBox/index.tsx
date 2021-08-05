import React, {FC, useState} from 'react';
import {CheckBox} from 'react-native-elements';

interface IProps {
  onPress?: () => {};
  title?: string;
  circle?: boolean;
  containerStyle?: object;
  checkedIcon?: string;
  props1?: any;
  value: any;
  key;
  id: any;
}

const CheckBoxComponent: FC<IProps> = ({
  onPress,
  title,
  circle,
  containerStyle,
  props1,
  value,
  id,
}) => {
  const [state, setstate] = useState({checked: false});
  const getCheckName = (item: any, newValue: any, key: any) => {
    console.log(item, newValue, key, 'itemmm');
    props1(item, newValue, id);
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
        getCheckName(title, value, id);
        console.log(id, 'keyyyyyy');
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
