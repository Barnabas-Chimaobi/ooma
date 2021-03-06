import React, {FC} from 'react';
import S from './styles';
import {Text, View} from 'react-native';
import {colors} from '../../colors';

interface IProps {
  price: string;
  clear?: boolean;
  style?: object;
  oldPrice?: any;
  mainPrice?: any;
  addsPrice: any;
  itemPrice: any;
}

const PriceTag: FC<IProps> = ({
  price,
  clear,
  oldPrice,
  style,
  mainPrice,
  addsPrice,
  itemPrice,
}) => (
  <View style={{flexDirection: 'column', alignItems: 'center'}}>
    {oldPrice !== undefined && oldPrice !== 0 ? (
      <Text
        style={{
          marginTop: -20,
          marginRight: 20,
          color: 'black',
          textDecorationLine: 'line-through',
          opacity: 0.4,
        }}>{`\u20A6${oldPrice}`}</Text>
    ) : null}

    {itemPrice ? (
      price !== undefined && !isNaN(price) ? (
        <Text
          style={
            !clear
              ? [addsPrice === 'price' ? S.addsPrice : S.price, style]
              : [
                  {color: mainPrice === 'mainprice' ? colors.start : 'black'},
                  style,
                ]
          }>{`\u20A6${price}`}</Text>
      ) : null
    ) : price !== undefined && price !== null ? (
      <Text
        style={
          !clear
            ? [addsPrice === 'price' ? S.addsPrice : S.price, style]
            : [
                {color: mainPrice === 'mainprice' ? colors.start : 'black'},
                style,
              ]
        }>{`\u20A6${price}`}</Text>
    ) : null}
  </View>
);

export default PriceTag;
