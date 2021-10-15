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
  checkout: any;
  orderTotal: any;
  orderefId: any;
  itemorder: any;
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
  checkout,
  orderTotal,
  orderefId,
  itemorder,
}: IProps) => {
  console.log(total, typeof total, '=======listssss===ssss==');
  return (
    <View style={[S.main, mainStyle]}>
      {randomTitle && (
        <View style={!itemorder ? S.bodyStyle : S.bodyStyle1}>
          <Text style={[S.textStyle, randomTitleStyle]}>{randomTitle}</Text>
          <View style={{marginLeft: orderefId ? 20 : '45%'}}>
            <Text style={[S.textStyle, randomStyle]}>{randomValue}</Text>
          </View>
          <Text></Text>
        </View>
      )}
      {subTotal !== undefined && typeof subTotal === 'number' && (
        <View style={S.bodyStyle}>
          <Text style={S.textStyle}>Sub Total</Text>
          <Text style={S.textStyle}>{`\u20A6${currencyFormat(subTotal)}`}</Text>
        </View>
      )}
      {deliveryCharges !== undefined && typeof subTotal === 'number' ? (
        <View style={S.bodyStyle}>
          <Text style={S.textStyle}>Delivery Charges</Text>
          <Text style={S.textStyle}>{`\u20A6${currencyFormat(
            deliveryCharges,
          )}`}</Text>
        </View>
      ) : null}
      {total !== undefined && typeof total === 'number' && (
        <View
          style={
            checkout === 'checkout' ? S.bodyStyleAmout1 : S.bodyStyleAmout
          }>
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

      {orderTotal !== undefined && typeof orderTotal === 'number' && (
        <View
          style={
            checkout === 'checkout' ? S.bodyStyleAmout1 : S.bodyStyleAmout
          }>
          <Text style={totalTitle ? {} : S.textStyle1}>
            {totalTitle || `Total`}
          </Text>
          <View style={{}}>
            <Text style={totalTitle ? {} : S.textStyle2}>
              {`\u20A6${currencyFormat(orderTotal)}`}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Total;
