import React from 'react';
import {View, Text} from 'react-native';
import S from './styles';
import {currencyFormat} from '../../Utils';

interface IProps {
  subTotal?: number;
  deliveryCharges?: any;
  total?: number;
  totalTitle?: string;
  mainStyle?: object;
  randomTitle?: string;
  randomValue?: string | number;
  randomStyle?: object;
  randomTitleStyle?: object;
  value: any;
}

const Total = ({
  subTotal,
  deliveryCharges,
  total,
  mainStyle,
  randomTitle,
  randomValue,
  totalTitle,
  randomStyle,
  randomTitleStyle,
  value,
}: IProps) => {
  console.log(
    subTotal,
    deliveryCharges,
    total,

    '=======listssss=====',
  );
  return (
    <View style={[S.main, mainStyle]}>
      {randomTitle && (
        <View style={S.bodyStyle}>
          <Text style={[S.textStyle, randomTitleStyle]}>{randomTitle}</Text>
          <Text style={[S.textStyle, randomStyle]}>{randomValue}</Text>
          <Text></Text>
        </View>
      )}
      {subTotal !== undefined && typeof subTotal === 'number' && (
        <View style={S.bodyStyle}>
          <Text style={S.textStyle}>Sub Total</Text>
          <Text style={S.textStyle}>{`\u20A6${currencyFormat(subTotal)}`}</Text>
        </View>
      )}
      {/* {deliveryCharges != 1 ? (
        <View style={S.bodyStyle}>
          <Text style={S.textStyle}>Delivery Charges</Text>
          <Text style={S.textStyle}>{`\u20A6${currencyFormat(
            deliveryCharges,
          )}`}</Text>
          <Text style={S.textStyle}># {deliveryCharges}</Text>
        </View>
      ) : null} */}
      {total !== undefined && typeof total === 'number' && (
        <View style={S.bodyStyle}>
          <Text style={totalTitle ? {} : S.textStyle1}>
            {totalTitle || `Total`}
          </Text>
          <Text style={totalTitle ? {} : S.textStyle1}>
            {`\u20A6${currencyFormat(total)}`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Total;
