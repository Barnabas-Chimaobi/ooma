import React from 'react';
import {View, Text, Image} from 'react-native';
import {Button, ButtonType} from '../../../../components';
import S from './styles';

interface IProps {
  title: string;
}

const DeliveryOptions = ({title}: IProps) => {
  return (
    <View style={S.main}>
      <Text style={S.title}>{title}</Text>
      <Button
        title="Pick-up"
        type={ButtonType.clear}
        imageIcon={require('../../../../assets/Images/shipping.png')}
        containerStyle={S.buttonContainer}
        titleStyle={S.buttonTitle}
      />
      <Button
        title="Delivery"
        type={ButtonType.clear}
        imageIcon={require('../../../../assets/Images/truck.png')}
        containerStyle={S.buttonContainer}
        titleStyle={S.buttonTitle}
      />
    </View>
  );
};

export default DeliveryOptions;
