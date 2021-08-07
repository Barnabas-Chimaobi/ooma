import React, {FC} from 'react';
import S from './styles';
import {Text, View} from 'react-native';

interface IProps {
  price: string;
  clear?: boolean;
  style?: object;
  oldPrice?: any;
}

const PriceTag: FC<IProps> = ({price, clear, oldPrice, style}) => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    {/* {oldPrice && (
      <Text
        style={{
          marginRight: 20,
          color: 'black',
          textDecorationLine: 'line-through',
        }}>{`\u20A6${oldPrice}`}</Text>
    )} */}
    {price && (
      <Text
        style={
          !clear ? [S.price, style] : [{color: 'black'}, style]
        }>{`\u20A6${price}`}</Text>
    )}
  </View>
);

export default PriceTag;
