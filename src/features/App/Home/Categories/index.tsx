import React, {FC} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
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
  // console.log(
  //   menuItem[0]?.MenuItemCategories?.map((item) => item?.itemCategoryId),
  //   '===menuitemmm =====',
  // );
  if (keys !== 'plan') {
    // console.log(
    //   menuItem?.[0]?.MenuItemCategories[0]?.itemCategoryId,
    //   '===menuitemmm ===',
    // );
  }
  const navigation = useNavigation();

  return (
    <View style={S.categoryMain}>
      {text !== 'text' && (
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={S.categoryTitle}>{title && capCase(title)}</Text>

            {/* <TouchableHighlight
              underlayColor=""
              onPress={() =>
                navigation.navigate('SelectedCategory', {
                  categoryId:
                    keys !== 'plan'
                      ? menuItem?.[0]?.MenuItemCategories[0]?.itemCategoryId
                      : null,
                })
              }>
              <Text style={S.viewAllStyle}>View all</Text>
            </TouchableHighlight> */}
          </View>

          {subtitle && <Text style={S.categorySubtitle}>{subtitle}</Text>}
        </View>
      )}

      <Carousel keyProp={keys} menuItem={menuItem} />
    </View>
  );
};

export default Categories;
