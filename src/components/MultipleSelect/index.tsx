import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {CheckBox, Divider} from 'react-native-elements';
import S from './styles';
import {Button} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from './../../store';
import {
  useCategory,
  useCombination,
  visibilityToggle,
  useMenuItemByCategory,
} from './../../reducers';
import {filterMenuItems} from './../../FetchData';

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
}: IProps) => {
  const {
    price,
    minPrice,
    maxPrice,
    category,
    combination,
    visible,
  } = useSelector((state: RootState) => state.filter);
  const [categories, setCategory] = useState('');
  const [prize, setPrize] = useState('');
  const [combine, setCombine] = useState('');
  const [branchId, setBranchId] = useState('');
  const [switchs, setSwitchs] = useState(false);
  const [checkedValue, setCheckedValue] = useState('');
  const [state, setChecked] = React.useState({
    isChecked:
      type == 'category'
        ? category || title1
        : type == 'combination'
        ? combination || title1
        : title1,
  });
  const {isChecked} = state;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const getBranchId = async () => {
      const branch = await AsyncStorage.getItem('branchId');
      const newbranch = JSON.parse(branch);
      setBranchId(newbranch);
      console.log(newbranch, 'branchiddddd');
    };

    getBranchId();
  }, []);

  const category1: any = category !== '' ? category : '';
  const minPrice1: any = minPrice !== 0 ? minPrice : 0;
  const maxPrice1: any = maxPrice !== 0 ? maxPrice : 0;
  const combination1: any = combination !== '' ? combination : '';

  const setTitle = (title: any) => {
    props(title);
  };

  const setLoad = (title: any) => {
    props1(title);
  };
  const toggleSwitch = () => setSwitchs((previousState) => !previousState);

  const filterMenuItem = async () => {
    const price = await AsyncStorage.getItem('price');
    const parsePrice = JSON.parse(price);
    const price1 = await AsyncStorage.getItem('price1');
    const parsePrice1 = JSON.parse(price1);
    console.log(categories, minPrice1, maxPrice1, 'categories====consolleeddd');
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
    // setLoad(true);
    console.log(switchs, 'switchssss');
    const filteredItem = await filterMenuItems(
      newbranch,
      1,
      // category1,
      // category,
      categories,
      parsePrice ? parsePrice : 0,
      parsePrice1 ? parsePrice1 : 0,
      combine,
      // combination1,
    );
    console.log(filteredItem, 'filteredItem');
    dispatch(useMenuItemByCategory(filteredItem));
    setLoad(false);
  };

  const handleRadioCheck = (type: any, value: any, title: any) => {
    console.log(value, type, title, 'valueeee');
    if (type === 'category') {
      setCategory(value);
      setCheckedValue(value);
      AsyncStorage.setItem('category', value);
      // dispatch(useCategory(value));
      console.log(type, value, 'fffffff');
      return;
    } else if (type === 'price') {
      setPrize(value);
      setCheckedValue(value);
      console.log(type, value);
      return;
    } else if (type === 'combination') {
      // setCombine(value);
      setCombine(value);
      setCheckedValue(value);
      AsyncStorage.setItem('menuType', value);
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
      {type && showButton && (
        <>
          <Divider />

          <Button
            title="APPLY"
            onPress={() => {
              setLoad(true);
              filterMenuItem();
              // isChecked == title1 && type == 'category'
              //   ? dispatch(useCategory(title1))
              //   : isChecked == title1 && type == 'combination'
              //   ? dispatch(useCombination(title1))
              //   : '';
              // isChecked == title2 && type == 'category'
              //   ? dispatch(useCategory(title2))
              //   : isChecked == title2 && type == 'combination'
              //   ? dispatch(useCombination(title2))
              //   : '';
              // isChecked == title3 && type == 'category'
              //   ? dispatch(useCategory(title3))
              //   : isChecked == title3 && type == 'combination'
              //   ? dispatch(useCombination(title3))
              //   : '';
              // isChecked == title4 && type == 'category'
              //   ? dispatch(useCategory(title4))
              //   : isChecked == title4 && type == 'combination'
              //   ? dispatch(useCombination(title4))
              //   : '';
              // isChecked == title5 && type == 'category'
              //   ? dispatch(useCategory(title5))
              //   : isChecked == title5 && type == 'combination'
              //   ? dispatch(useCombination(title5))
              //   : '';
              setTitle(false);
              // overlay && dispatch(visibilityToggle());
            }}
            buttonStyle={S.buttonStyle}
          />
        </>
      )}
    </View>
  );
};

export default RadioSelect;
