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
  text: string;
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
  text,
}) => {
  const navigation = useNavigation();
  return (
    <View style={S.categoryMain}>
      {text !== 'text' && (
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={S.categoryTitle}>{title && capCase(title)}</Text>
            <Text
              onPress={() => {
                console.log('aba');
              }}
              style={S.viewAllStyle}>
              View all
            </Text>
          </View>

          {subtitle && <Text style={S.categorySubtitle}>{subtitle}</Text>}
        </View>
      )}

      <Carousel keyProp={keys} menuItem={menuItem} />
    </View>
  );
};

export default Categories;
