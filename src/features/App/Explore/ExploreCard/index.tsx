import React, {FC} from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import S from '../styles';
import {useNavigation} from '@react-navigation/native';
import {ib} from '../../../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../../../colors/index';
import LinearGradient from 'react-native-linear-gradient';

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
      {title === 'Hot categories' ? (
        <View style={{flex: 1}}>
          <Text style={[S.title, titleStyle]}>{title}</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                // flex: 1,
                // flexWrap: 'wrap',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                // marginLeft: '1%',
              }}>
              {categories &&
                categories?.map((item, index) =>
                  categories.length >= 8
                    ? index < 8 && (
                        <ItemCard1 categoryItems={item} compType={compType} />
                      )
                    : index < 6 && (
                        <ItemCard1 categoryItems={item} compType={compType} />
                      ),
                )}
            </View>
          </ScrollView>
        </View>
      ) : title === 'Top Meal Plans' ? (
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
                categories.length >= 4
                  ? index < 4 && (
                      <ItemCard categoryItems={item} compType={compType} />
                    )
                  : index < 2 && (
                      <ItemCard categoryItems={item} compType={compType} />
                    ),
              )}
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <Text style={[S.title, titleStyle]}>{title}</Text>
          <ScrollView>
            <View
              style={{
                // flexWrap: 'wrap',
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center',
                // marginLeft: '1%',
              }}>
              {categories &&
                categories?.map((item, index) =>
                  categories.length >= 8
                    ? index < 8 && (
                        <ItemCard2 categoryItems={item} compType={compType} />
                      )
                    : index < 6 && (
                        <ItemCard2 categoryItems={item} compType={compType} />
                      ),
                )}
            </View>
          </ScrollView>
        </View>
      )}
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
              eachCat: 'eachCat',
              categoryName: categoryItems?.name,
            })
          : navigation.navigate('SelectedCategory', {
              categoryId: categoryItems?.id,
            });
      }}>
      <ImageBackground source={{uri: image_Url}} style={S.imageBackground}>
        {/* <View style={S.imageMaskBackground}> */}
        <LinearGradient
          colors={[
            'rgba(100, 100, 100, 0.4) 100%',
            'rgba(100, 100, 100, 0.4)',
            'rgba(100, 100, 100, 0.4) 46.88%',
          ]}
          style={{height: '100%'}}>
          <Text
            style={{
              color: colors.white,
              flexWrap: 'wrap',
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 16,
              textTransform: 'capitalize',
              marginTop: '95%',
            }}>
            {categoryItems?.name}
          </Text>
        </LinearGradient>

        {/* </View> */}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export const ItemCard1: FC<IProps> = ({categoryItems, compType}) => {
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
        {/* <View style={S.imageMaskBackground}> */}
        <LinearGradient
          colors={[
            'rgba(100, 100, 100, 0.4) 100%',
            'rgba(100, 100, 100, 0.4)',
            'rgba(100, 100, 100, 0.4) 46.88%',
          ]}
          style={{height: '100%'}}>
          <Text
            style={{
              color: colors.white,
              flexWrap: 'wrap',
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 16,
              textTransform: 'capitalize',
              marginTop: '95%',
            }}>
            {categoryItems?.name}
          </Text>
        </LinearGradient>
        {/* </View> */}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export const ItemCard2: FC<IProps> = ({categoryItems, compType}) => {
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
      <ImageBackground source={{uri: image_Url}} style={S.imageBackground1}>
        {/* <View style={S.imageMaskBackground}> */}
        <LinearGradient
          colors={[
            'rgba(100, 100, 100, 0.4) 100%',
            'rgba(100, 100, 100, 0.4)',
            'rgba(100, 100, 100, 0.4) 46.88%',
          ]}
          style={{height: '100%'}}>
          <Text
            style={{
              color: colors.white,
              flexWrap: 'wrap',
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 16,
              textTransform: 'capitalize',
              marginTop: '30%',
            }}>
            {categoryItems?.name}
          </Text>
        </LinearGradient>
        {/* </View> */}
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default Card;
