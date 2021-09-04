import React from 'react';
import {Pressable, View, Text, TouchableHighlight} from 'react-native';
import {Divider} from 'react-native-elements';
import S from './styles';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

interface IProps {
  dateTitle: string;
  titlePosition?: string;
  children?: any;
  mainStyle?: object;
  details: any;
  onPress?: () => void;
}

const OrderCard = ({
  details,
  dateTitle,
  titlePosition,
  children,
  onPress,
  mainStyle,
}: IProps) => {
  const navigation = useNavigation();
  console.log(details, 'details======');

  return (
    // <Pressable onPress={onPress}>
    <TouchableHighlight
      underlayColor=""
      onPress={() => navigation.navigate('OrderDetails1', {detail: details})}>
      <View style={[S.main, mainStyle]}>
        <Text style={titlePosition == 'right' ? S.right : S.left}>
          {dateTitle}
        </Text>
        <Divider style={{marginBottom: 10}} />
        {children}
      </View>
    </TouchableHighlight>
    // </Pressable>
  );
};

export default OrderCard;
