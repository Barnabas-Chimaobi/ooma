import React from 'react';
import {View, Text} from 'react-native';
import S from './styles';
import {currencyFormat} from '../../Utils';

interface IProps {
  subTotal?: number;
  deliveryCharges?: any;
  total?: any;
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
  console.log(total, typeof total, '=======listssss===ssss==');
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
        <View style={S.bodyStyleAmout}>
          <Text style={totalTitle ? {} : S.textStyle1}>
            {totalTitle || `Total`}
          </Text>
          <View style={{marginLeft: '35%'}}>
            <Text style={totalTitle ? {} : S.textStyle2}>
              {`\u20A6${currencyFormat(total)}`}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Total;
