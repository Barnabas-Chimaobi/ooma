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
  prefCheck: any;
  preferencAdd: any;
  prefRemove: any;
  edit: any;
}

const CheckBoxComponent: FC<IProps> = ({
  onPress,
  title,
  circle,
  containerStyle,
  props1,
  value,
  id,
  prefCheck,
  preferencAdd,
  prefRemove,
  edit,
}) => {
  const [state, setstate] = useState({checked: false});
  const getCheckName = (item: any, newValue: any, key: any) => {
    console.log(item, newValue, key, 'itemmm');
    props1(item, newValue, id);
  };
  const addPref = () => {
    if (edit) {
      if (state?.checked) {
        preferencAdd();
      } else {
        prefRemove();
      }
    } else {
      if (!state?.checked) {
        preferencAdd();
      } else {
        prefRemove();
      }
    }
  };

  return (
    <CheckBox
      title={title}
      checkedIcon={circle ? 'circle' : 'check'}
      uncheckedIcon={circle ? 'circle' : 'square-o'}
      checked={edit ? !state.checked : state.checked}
      textStyle={{marginLeft: 40, fontWeight: 'normal'}}
      onPress={() => {
        setstate({checked: !state.checked});
        !prefCheck ? getCheckName(title, value, id) : null;
        addPref();
        // console.log(id, 'keyyyyyy');
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
