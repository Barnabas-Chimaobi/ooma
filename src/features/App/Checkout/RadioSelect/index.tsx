import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {CheckBox, Divider} from 'react-native-elements';
import S from '../../../../components/MultipleSelect/styles';

interface IProps {
  onPress?: () => void;
  title?: string;
  title1?: string;
  title2?: string;
  title3?: string;
  title4?: string;
  title5?: string;
  defaultTitle?: string;
  value?: string;
  type?: string;
  showButton?: boolean;
  overlay?: boolean;
  props?: any;
  props1?: any;
  props2?: any;
}

const RadioSelect = ({
  onPress,
  title,
  title1,
  title2,
  title3,
  title4,
  title5,
  type,
  showButton,
  overlay,
  props,
  props1,
  props2,
}: IProps) => {
  const [switchs, setSwitchs] = useState(false);
  const [checkedValue, setCheckedValue] = useState('');
  const [state, setChecked] = React.useState({
    isChecked:
      type == 'I Will Pay'
        ? type || title1
        : type == 'Payment Method'
        ? type || title1
        : type,
  });
  const {isChecked} = state;

  const setTitle = (title: any) => {
    props(title);
  };

  const setLoad = (title: any) => {
    props1(title);
  };

  const setChannel = (title: any) => {
    props2(title);
  };
  const toggleSwitch = () => setSwitchs((previousState) => !previousState);

  const handleRadioCheck = (type: any, value: any, title: any) => {
    console.log(value, type, title, 'valueeee');
    if (type === 'I Will Pay') {
      setCheckedValue(value);
      // dispatch(useCategory(value));
      console.log(type, value, 'fffffff');
      return;
    } else if (type === 'Payment Method') {
      // setCombine(value);
      setCheckedValue(value);
      // dispatch(useCombination(value));
      console.log(type, value);
      return;
    } else if (type === 'Order Channel') {
      setCheckedValue(value);
      // props2(title);
      // dispatch(useCombination(value));
      console.log(type, value);
      return;
    }
  };
  return (
    <View>
      {title && <Text style={S.titleStyle}>{title}</Text>}
      <CheckBox
        title={title1}
        checkedIcon={'circle'}
        uncheckedIcon={'circle'}
        checked={checkedValue == title1 ? true : false}
        textStyle={[S.textStyle, isChecked === title1 && S.activeTextStyle]}
        onPress={() => {
          setTitle(title1);
          // setChecked({isChecked: title1});
          handleRadioCheck(type, title1, title);
        }}
        checkedColor="green"
        containerStyle={S.containerStyle}
      />
      {title2 && (
        <CheckBox
          title={title2}
          checkedIcon={'circle'}
          uncheckedIcon={'circle'}
          checked={checkedValue === title2 ? true : false}
          textStyle={[S.textStyle, isChecked === title2 && S.activeTextStyle]}
          onPress={() => {
            setTitle(title2);
            // setChecked({isChecked: title2});
            handleRadioCheck(type, title2, title);
          }}
          checkedColor="green"
          containerStyle={S.containerStyle}
        />
      )}
      {title3 && (
        <CheckBox
          title={title3}
          checkedIcon={'circle'}
          uncheckedIcon={'circle'}
          checked={checkedValue === title3 ? true : false}
          textStyle={[S.textStyle, isChecked === title3 && S.activeTextStyle]}
          onPress={() => {
            setTitle(title3);
            // setChecked({isChecked: title3});
            handleRadioCheck(type, title3, title);
          }}
          checkedColor="green"
          containerStyle={S.containerStyle}
        />
      )}
      {title4 && (
        <CheckBox
          title={title4}
          checkedIcon={'circle'}
          uncheckedIcon={'circle'}
          checked={checkedValue === title4 ? true : false}
          textStyle={[S.textStyle, isChecked === title4 && S.activeTextStyle]}
          onPress={() => {
            setTitle(title4);
            // setChecked({isChecked: title4});
            handleRadioCheck(type, title4, title);
          }}
          checkedColor="green"
          containerStyle={S.containerStyle}
        />
      )}
      {title5 && (
        <CheckBox
          title={title5}
          checkedIcon={'circle'}
          uncheckedIcon={'circle'}
          checked={checkedValue === title5 ? true : false}
          textStyle={[S.textStyle, isChecked === title5 && S.activeTextStyle]}
          onPress={() => {
            setTitle(title5);
            // setChecked({isChecked: title5});
            handleRadioCheck(type, title5, title);
          }}
          checkedColor="green"
          containerStyle={S.containerStyle}
        />
      )}
    </View>
  );
};

export default RadioSelect;
