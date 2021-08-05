import React, {FC} from 'react';
import {View, Text} from 'react-native';
import S from '../styles';
import Carousel from '../Carousel';
import {useNavigation} from '@react-navigation/native';
import {capCase} from '../../../../Utils/Helper';

// import Skeleton from '../skeleton';
interface IProps {
  title: any;
  subtitle?: any;
  data?: object;
  menuItem?: [];
  page?: number;
  bool?: boolean;
  keys: string;
  // onPress?: () => void;
}

const Categories: FC<IProps> = ({
  title,
  subtitle,
  data,
  menuItem,
  page,
  bool,
  keys,
}) => {
  const navigation = useNavigation();
  return (
    <View style={S.categoryMain}>
      <Text style={S.categoryTitle}>{title && capCase(title)}</Text>
      {subtitle && <Text style={S.categorySubtitle}>{subtitle}</Text>}
      <Text
        onPress={() => {
          console.log('aba');
        }}
        style={S.viewAllStyle}>
        View all
      </Text>
      <Carousel keyProp={keys} menuItem={menuItem} />
    </View>
  );
};

export default Categories;
