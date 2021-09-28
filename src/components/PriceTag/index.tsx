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
}

const PriceTag: FC<IProps> = ({price, clear, oldPrice, style, mainPrice}) => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    {/* {oldPrice && (
      <Text
        style={{
          marginRight: 20,
          color: 'black',
          textDecorationLine: 'line-through',
        }}>{`\u20A6${oldPrice}`}</Text>
    )} */}
    {price !== undefined ? (
      <Text
        style={
          !clear
            ? [S.price, style]
            : [
                {color: mainPrice === 'mainprice' ? colors.start : 'black'},
                style,
              ]
        }>{`\u20A6${price}`}</Text>
    ) : null}
  </View>
);

export default PriceTag;
