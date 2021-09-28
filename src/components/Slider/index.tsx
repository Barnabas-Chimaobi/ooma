import React, {useState, useEffect} from 'react';
import {Text, Dimensions, View} from 'react-native';
import S from './styles';
import Slider from '@react-native-community/slider';
import {currencyFormat} from '../../Utils/CurrencyFormatter';
import {colors} from '../../colors';
import {Button} from '../Button';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../store';
import {
  usePricing,
  visibilityToggle,
  useMaxPricing,
  useMinPricing,
  useMenuItemByCategory,
} from './../../reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {filterMenuItems} from './../../FetchData';

const SliderBar = ({
  title,
  type,
  parameters,
  parameters1,
  parameters2,
}: any) => {
  // const {minPrice,maxPrice} = useSelector((state: RootState) => state.filter);
  const [minPrices, setMinprice] = useState();
  const [maxPrices, setMaxprice] = useState();
  const dispatch: AppDispatch = useDispatch();
  const [branchId, setBranchId] = useState('');

  const {
    price,
    minPrice,
    maxPrice,
    category,
    combination,
    visible,
  } = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    const getBranchId = async () => {
      const newBranchId: any = await AsyncStorage.getItem('branchId');
      setBranchId(newBranchId);
    };

    getBranchId();
  }, []);

  const category1: string = category !== '' ? category : '';
  const minPrice1: any = minPrices !== 0 ? minPrices : 0;
  const maxPrice1: any = maxPrices !== 0 ? maxPrices : 0;
  const combination1: string = combination !== '' ? combination : '';

  const pricing = (item1: any) => {
    parameters(item1);
  };
  const pricing1 = (item1: any) => {
    parameters1(item1);
  };
  const loading = (item1: any, item2: any) => {
    parameters2(item1, item2);
  };

  const filterMenuItem = async () => {
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
    loading(true, false);
    const filteredItem = await filterMenuItems(
      newbranch,
      1,
      category1,
      minPrice1,
      maxPrice1,
      combination1,
    );
    console.log(filteredItem, 'filteredItem');
    dispatch(useMenuItemByCategory(filteredItem));
    loading(false, false);
    console.log(filteredItem, 'pricefilteredddd');
  };

  const [state, setState] = useState<any>({
    visible: false,
    value1: maxPrice || 0,
    value2: minPrice || 0,
  });

  const windowHeight = Dimensions.get('window').height;
  const left1 = ((state.value1 / 300) * windowHeight + 100) / 100 - 10;
  const left2 = ((state.value2 / 300) * windowHeight + 100) / 100 - 10;
  const minimumValue = 100;
  const maximumValue = 10000;
  const {value1, value2} = state;
  return (
    <View style={S.mainStyle}>
      {title && <Text style={S.titleStyle}>{title}</Text>}

      <Text style={{fontSize: 10, bottom: 3}}>Minimum</Text>
      <Slider
        style={S.sliderStyle}
        step={100}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        value={state.value2}
        maximumTrackTintColor={colors.greyShade}
        minimumTrackTintColor={colors.primary}
        onValueChange={(value2: any) => {
          pricing(value2);
          setMinprice(value2);
          setState({...state, value2});
          // setState({...state, value2});
          // !type
          //   ? dispatch(useMinPricing(`${value2}`)) &&
          //     setState({...state, value2})
          //   : setState({...state, value2});
        }}
      />
      <Text style={[S.textStyle, {left: left2}]}>
        {state.value2 == maximumValue
          ? `Above \u20A6${currencyFormat(state.value2)}`
          : `\u20A6${currencyFormat(state.value2)}`}
      </Text>

      <Text style={{fontSize: 10, left: 260}}>Maximum</Text>
      <Slider
        style={S.sliderStyle}
        step={100}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        value={state.value1}
        maximumTrackTintColor={colors.greyShade}
        minimumTrackTintColor={colors.primary}
        onValueChange={(value1: any) => {
          // console.log(value1, 'valuee');
          setMaxprice(value1);
          pricing1(value1);
          setState({...state, value1});
          // !type
          //   ? // ? dispatch(useMaxPricing(`${value1}`)) &&
          //     dispatch(useMaxPricing(`${value1}`)) &&
          //     setState({...state, value1})
          //   : setState({...state, value1});
        }}
      />
      <Text style={[S.textStyle, {left: left1}]}>
        {state.value1 == maximumValue
          ? `Above \u20A6${currencyFormat(state.value1)}`
          : `\u20A6${currencyFormat(state.value1)}`}
      </Text>
      {type && (
        <Button
          title="APPLY"
          onPress={() => {
            // value2 > value1
            //   ? console.log('error')
            // : dispatch(useMaxPricing(`${value1}`)) &&
            // dispatch(useMinPricing(`${value2}`)) &&
            loading(true, false);
            filterMenuItem();
            // &&
            // dispatch(visibilityToggle());
          }}
          buttonStyle={S.buttonStyle}
        />
      )}
    </View>
  );
};

export default SliderBar;
