import React, {FC} from 'react';
import {View, ImageBackground, Text, TouchableOpacity} from 'react-native';
import S from '../styles';
import {useNavigation} from '@react-navigation/native';
import {ib} from '../../../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../../../colors/index';

interface IProps {
  title?: string;
  categories?: [];
  categoryItems?: any;
  compType?: string;
  titleStyle?: any;
}

const Card: FC<IProps> = ({title, categories, compType, titleStyle}) => {
  // console.log(categories, 'categoriesssss');
  let count;
  return (
    <View>
      <Text style={[S.title, titleStyle]}>{title}</Text>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center',
          // marginLeft: '1%',
        }}>
        {categories &&
          categories?.map((item, index) =>
            categories.length >= 8
              ? index < 8 && (
                  <ItemCard categoryItems={item} compType={compType} />
                )
              : index < 6 && (
                  <ItemCard categoryItems={item} compType={compType} />
                ),
          )}
      </View>
    </View>
  );
};

export const ItemCard: FC<IProps> = ({categoryItems, compType}) => {


  const navigation = useNavigation();
  const image_Url = categoryItems?.imageUrl || categoryItems?.imageurl;
  return (
    <TouchableOpacity
      onPress={async () => {
        await AsyncStorage.setItem(
          'categoryId',
          JSON.stringify(categoryItems?.id),
        );
        compType === 'menuPlan'
          ? navigation.navigate('MenuPlanByCategory', {
              categoryId: categoryItems?.id,
              categoryName: categoryItems?.name,
            })
          : navigation.navigate('SelectedCategory', {
              categoryId: categoryItems?.id,
            });
      }}>
      <ImageBackground source={{uri: image_Url}} style={S.imageBackground}>
        <View style={S.imageMaskBackground}>
          <Text
            style={{
              color: colors.white,
              flexWrap: 'wrap',
              fontWeight: '400',
              alignSelf: 'center',
              fontSize: 16,
              textAlign: 'center',
            }}>
            {categoryItems?.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default Card;
