import React, {useState, FC, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Button, ButtonType, Slider, Radio} from '../../../../../components';
import BottomSheet from '../BottomSheet';
import S from './styles';
import {useNavigation} from '@react-navigation/native';
import {filter} from '../../../../../assets';
import {clearAll, visibilityToggle} from '../../../../../reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SearchMenuItemByCategoryId,
  filterMenuItems,
} from '../../../../../FetchData';
import {useMenuItemByCategory} from '../../../../../reducers';
import {useSelector, useDispatch} from 'react-redux';

import {RootState, AppDispatch} from '../../../../../store';
import {colors} from '../../../../../colors';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const FilterBar = () => {
  const [state, setState] = useState({value: ''});
  const [categoryId, setCategoryId] = useState<number>();
  const [switchs, setSwitchs] = useState(false);
  const [branch, setBranchId] = useState('');
  const [sorts, setSorts] = useState('');
  const [categorys, setCategory] = useState('');
  const [loader, setLoader] = useState(false);
  const [minPrices, setMinprice] = useState();
  const [maxPrices, setMaxprice] = useState();
  const {value} = state;
  const toggleSwitch = () => setSwitchs((previousState) => !previousState);

  const onPress = (value: string) => {
    toggleSwitch();
    // dispatch(visibilityToggle());
    setState({...state, value});
  };
  const {
    price,
    maxPrice,
    minPrice,
    category,
    combination,
    visible,
  } = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    const getBranchId = async () => {
      const newBranchId: any = await AsyncStorage.getItem('branchId');
      setBranchId(newBranchId);
      console.log(newBranchId, 'branchiddddd');
    };

    getBranchId();

    const getCategpryId = async () => {
      const id: any = await AsyncStorage.getItem('categoryId');
      console.log(id, 'iddddddd');
      setCategoryId(Number(id));
    };

    getCategpryId();
  });

  const filterMenuItem = async () => {
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
    const filteredItem = await filterMenuItems(
      newbranch,
      1,
      // category1,
      category,
      state,
      minPrice,
      maxPrice,
      // combination1,
    );
    dispatch(useMenuItemByCategory(filteredItem));
  };

  const setTitle = (title: any) => {
    if (title == 'Both' || title == 'Single dishes' || title == 'Combo meals') {
      setSorts(title);
    } else {
      null;
    }

    if (
      title == 'Popular' ||
      title == 'Special Offer' ||
      title == 'Discount' ||
      title == 'New'
    ) {
      setCategory(title);
    } else {
      null;
    }

    if (title == false) {
      setSwitchs(title);
    }

    // console.log(title, 'presssssseeedddd');
  };

  const setLoad = (title: any) => {
    console.log(title, 'booooleannnnnn');
    if (title == true) {
      setLoader(title);
    } else {
      setLoader(false);
    }
  };

  const clear = () => {
    setSorts('');
    setCategory('');
    setMinprice('');
    setMinprice('');
  };

  const pricing = (item: any) => {
    setMinprice(item);
    console.log(item, 'itemssss');
  };

  const pricing1 = (item: any) => {
    setMaxprice(item);
    console.log(item, 'itemssss');
  };
  const loading = (item: any, item1: any) => {
    setSwitchs(item1);
    if (item == true) {
      setLoader(item);
    } else {
      setLoader(false);
    }
  };

  const getItemByCategoryId = async () => {
    setLoader(true);
    const newData = categoryId
      ? await SearchMenuItemByCategoryId(categoryId, 1)
      : [];
    dispatch(useMenuItemByCategory(newData.data.items));
    setLoader(false);
  };

  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View style={S.main}>
      <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
        <Image style={{width: 25, height: 25}} source={filter} />
      </TouchableOpacity>
      <Spinner
        visible={loader}
        // textStyle={styles.spinnerTextStyle}
        overlayColor="rgba(66, 66, 66,0.6)"
        customIndicator={<BallIndicator color="white" />}
      />
      {combination ? (
        <Button
          title={combination || 'Sort By'}
          buttonStyle={[S.buttonStyle, combination && S.activeButtonStyle]}
          titleStyle={[S.titleStyle, combination && S.activeTitleStyle]}
          onPress={() => onPress('sort')}
        />
      ) : (
        <Button
          title={sorts || 'Sort By'}
          buttonStyle={[S.buttonStyle, sorts && S.activeButtonStyle]}
          titleStyle={[S.titleStyle, sorts && S.activeTitleStyle]}
          iconName="chevron-down"
          iconRight
          iconSize={12}
          onPress={() => {
            onPress('sort');
          }}
        />
      )}
      <Button
        title={
          minPrices > 0 || maxPrices > 0
            ? `\u20A6${minPrices} - \u20A6${maxPrices}`
            : 'Price'
        }
        buttonStyle={[S.buttonStyle, price && S.activeButtonStyle]}
        titleStyle={[S.titleStyle, price && S.activeTitleStyle]}
        onPress={() => onPress('price')}
      />
      <Button
        title={categorys || 'Category'}
        buttonStyle={[S.buttonStyle, categorys && S.activeButtonStyle]}
        titleStyle={[S.titleStyle, categorys && S.activeTitleStyle]}
        onPress={() => onPress('category')}
      />
      <Button
        title="Clear All"
        buttonStyle={S.clearButtonStyle}
        type={ButtonType.clear}
        titleStyle={S.clearTitleStyle}
        onPress={() => {
          clear();
          getItemByCategoryId();
        }}
      />
      <BottomSheet
        title={
          value == 'sort'
            ? 'Sort By'
            : value == 'price'
            ? 'Price'
            : value == 'category'
            ? 'Category'
            : value
        }
        buttonTitle="APPLY"
        children={
          <>
            {value == 'sort' ? (
              <Radio
                title1="Both"
                title2="Single dishes"
                title3="Combo meals"
                type="combination"
                showButton
                overlay
                props={(title: any) => setTitle(title)}
                props1={(title: any) => setLoad(title)}
                // onPress={() => setTitle()}
              />
            ) : value == 'category' ? (
              <Radio
                title1="Popular"
                title2="Special Offer"
                title3="Discount"
                title4="New"
                type="category"
                showButton
                overlay
                props={(title: any) => setTitle(title)}
                props1={(title: any) => setLoad(title)}
                // onPress={() => setTitle()}
              />
            ) : (
              <Slider
                type
                parameters={(item: any) => pricing(item)}
                parameters1={(item: any) => pricing1(item)}
                parameters2={(item: any, item1: any) => loading(item, item1)}
              />
            )}
          </>
        }
        onPress={() => {
          toggleSwitch(), filterMenuItem();
        }}
        isVisible={switchs}
        onBackdropPress={() => toggleSwitch()}
        // onBackdropPress={() => dispatch(visibilityToggle())}
      />
    </View>
  );
};

export default FilterBar;
