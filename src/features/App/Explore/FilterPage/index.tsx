import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Divider} from 'react-native-elements';
import {Slider, Radio, Button, SimpleHeader} from '../../../../components';
import S from './styles';
import {
  clearAll,
  useCombination,
  useCategory,
  useFilter,
} from '../../../../reducers';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootState, AppDispatch} from '../../../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {filterMenuItems} from '../../../../FetchData';
import {useMenuItemByCategory} from '../../../../reducers';
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
import Footer from '../../../../navigation/footer';
import {StyleFoot} from '../../../../navigation/styles';

const Filter = () => {
  const [explore, setExplore] = useState('explore');
  const [branchId, setBranchId] = useState('');
  const [sorts, setSorts] = useState('');
  const [categorys, setCategory] = useState('');
  const [loader, setLoader] = useState(false);
  const [minPrices, setMinprice] = useState(0);
  const [maxPrices, setMaxprice] = useState(0);
  const [switchs, setSwitchs] = useState(false);

  const {
    price,
    minPrice,
    maxPrice,
    category,
    combination,
    visible,
  } = useSelector((state: RootState) => state.filter);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const getBranchId = async () => {
      const newBranchId: any = await AsyncStorage.getItem('branchId');
      setBranchId(newBranchId);
    };

    getBranchId();
  }, []);

  const navigation = useNavigation();
  const category1: string = categorys !== '' ? categorys : '';
  const minPrice1: any = minPrices !== 0 ? minPrices : 0;
  const maxPrice1: any = maxPrices !== 0 ? maxPrices : 0;
  const combination1: string = sorts !== '' ? sorts : '';

  const filterMenuItem = async () => {
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
    // loading(true, false);
    setLoader(true);
    const filteredItem = await filterMenuItems(
      newbranch,
      1,
      category1,
      minPrice1,
      maxPrice1,
      combination1,
    );
    setLoader(false);
    navigation.navigate('SelectedCategory', {filteredItem, filter: 'filter'});
    console.log(
      filteredItem.length,
      category1,
      minPrice1,
      maxPrice1,
      combination1,
      'filteredItem======',
    );
    dispatch(useMenuItemByCategory(filteredItem));
  };

  const setTitle = (title: any) => {
    console.log(title, 'titttllll');
    if (title == 'Both' || title == 'Single Meal' || title == 'Combo dish') {
      setSorts(title);
      AsyncStorage.setItem('type', title);
    } else {
      null;
    }

    if (
      title == 'POPULAR' ||
      title == 'SPECIAL_OFFER' ||
      title == 'DISCOUNT' ||
      title == 'NEW'
    ) {
      setCategory(title);
      AsyncStorage.setItem('category', title);
    } else {
      null;
    }

    if (title == false) {
      setSwitchs(title);
    }

    // console.log(title, 'presssssseeedddd');
  };

  const pricing = (item: any) => {
    console.log(item, 'pricinggggg');
    setMinprice(item);
    AsyncStorage.setItem('price', item);
    console.log(item, 'itemssss');
  };

  const pricing1 = (item: any) => {
    setMaxprice(item);
    AsyncStorage.setItem('price1', item);
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

  const setLoad = (title: any) => {
    console.log(title, 'booooleannnnnn');
    if (title == true) {
      setLoader(title);
    } else {
      setLoader(false);
    }
  };

  return (
    <View style={S.mainStyle}>
      <SimpleHeader style={{paddingLeft: 10}} />
      <Spinner
        visible={loader}
        // textStyle={styles.spinnerTextStyle}
        overlayColor="rgba(66, 66, 66,0.6)"
        customIndicator={<BallIndicator color="white" />}
      />
      <ScrollView style={{flex: 1, marginBottom: 50}}>
        <Radio
          title="Category"
          title1="POPULAR"
          title2="SPECIAL_OFFER"
          title3="DISCOUNT"
          title4="NEW"
          type="category"
          props={(title: any) => setTitle(title)}
          props1={(title: any) => setLoad(title)}
        />
        <Divider />
        <Slider
          title="Price"
          parameters={(item: any) => pricing(item)}
          parameters1={(item: any) => pricing1(item)}
          parameters2={(item: any, item1: any) => loading(item, item1)}
        />

        <Divider />
        <Radio
          title="Combination"
          title1="Both"
          title2="Single Meal"
          title3="Combo dish"
          type="combination"
          props={(title: any) => setTitle(title)}
          props1={(title: any) => setLoad(title)}
        />
        <Button
          title={'APPLY'}
          onPress={
            () => {
              filterMenuItem();
            }
            // {
            // console.log(combination1, category1)
            // dispatch(useCombination(combination1));
            // dispatch(useCategory(category1));
            // }
          }
          containerStyle={S.buttonStyle}
        />
      </ScrollView>
      <View style={StyleFoot.footer}>
        <Footer navigation={navigation} explore={explore} />
      </View>
    </View>
  );
};

export default Filter;
