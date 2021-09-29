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
  itemEdit: any;
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
  itemEdit,
}: IProps) => {
  const [state, setState] = itemEdit
    ? useState(isAddon ? quantity : edit)
    : useState(isAddon ? 0 : 1);
  const [prices, setPrice] = useState(price);
  // const {value} = state;
  useEffect(() => {
    console.log(edit, quantity, '===edit====');
  });

  const getQuantity = (item: any, str: any) => {
    console.log(state, item, 'stat========e');
    props(item);
    if (str == 'plus') {
      processAddons(itemAddon);
      let newPrice = itemEdit
        ? parseInt(item + 1) * parseInt(itemAddon?.initialPrice)
        : parseInt(item + 1) * parseInt(price);
      newPrice != 0 ? setPrice(newPrice) : null;
    } else {
      if (state >= 1) {
        removeAddon(itemAddon);
        let newPrice = itemEdit
          ? parseInt(item - 1) * parseInt(itemAddon?.initialprice)
          : parseInt(item + 1) * parseInt(price);
        newPrice != 0 ? setPrice(newPrice) : null;
      }
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
    str == 'minus' && state >= (title == 'Adjust Quantity' ? 2 : 1)
      ? setState(state - 1)
      : str == 'plus'
      ? setState(state + 1)
      : 1;

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
      {price !== undefined && <PriceTag price={Number(prices)} clear />}
    </View>
  );
};

export default Adjust;
