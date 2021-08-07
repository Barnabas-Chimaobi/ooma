import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import PriceTag from '../PriceTag';
import {Button} from '../Button';
import S from './styles';

interface IProps {
  mainStyle?: object;
  titleStyle?: object;
  subMainStyle?: object;
  title: string;
  price?: number;
  subTitleStyle?: object;
  quantity: any;
  addons: any;
  props?: any;
  props1?: any;
  isAddon?: any;
  processAddons?: any;
  removeAddon?: any;
  itemAddon?: any;
  edit: any;
}

const Adjust = ({
  mainStyle,
  titleStyle,
  price,
  title,
  subTitleStyle,
  quantity,
  addons,
  props,
  props1,
  isAddon,
  removeAddon,
  processAddons,
  itemAddon,
  edit,
}: IProps) => {
  const [state, setState] = useState(isAddon ? 0 : 1);
  const [prices, setPrice] = useState(price);
  // const {value} = state;
  useEffect(() => {
    console.log(edit, '===edit====');
  });

  const getQuantity = (item: any, str: any) => {
    console.log(state, 'state');
    props(item);
    if (str == 'plus') {
      processAddons(itemAddon);
      let newPrice = parseInt(item + 1) * parseInt(price);
      newPrice != 0 ? setPrice(newPrice) : null;
    } else {
      state >= 1 && removeAddon(itemAddon);
      let newPrice = parseInt(item - 1) * parseInt(price);
      newPrice != 0 ? setPrice(newPrice) : null;
    }
  };

  const getQuantity1 = (item: any, str: any) => {
    console.log(state, 'statess111');
    if (str == 'plus') {
      props1(item + 1);
    } else {
      props1(item - 1);
    }
  };

  const getAddons = () => {};

  const onChange = (str: string, title: any) => {
    str == 'minus' && state >= 1
      ? setState(state - 1)
      : str == 'plus'
      ? setState(state + 1)
      : 1;
    // setState({
    //   value:
    //     str == 'minus' && value >= 1
    //       ? value - 1
    //       : str == 'plus'
    //       ? value + 1
    //       : 1,
    // });
    if (title == 'Adjust Quantity') {
      getQuantity1(state, str);
    } else {
      getQuantity(state, str);
    }
  };

  return (
    <View style={[S.main, mainStyle]}>
      <Text style={[S.titleStyle, titleStyle]}>{title}</Text>
      <View style={S.subMainStyle}>
        <Button
          iconName="minus"
          iconSize={10}
          buttonStyle={S.buttonStyle}
          onPress={() => {
            onChange('minus', title);
          }}
        />
        <Text style={S.valueStyle}>{state}</Text>
        <Button
          iconName="plus"
          iconSize={10}
          buttonStyle={S.buttonStyle}
          onPress={() => {
            onChange('plus', title);
          }}
        />
      </View>
      {price && <PriceTag price={prices} clear />}
    </View>
  );
};

export default Adjust;
