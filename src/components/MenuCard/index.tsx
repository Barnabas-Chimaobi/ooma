import React, {FC} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import S from './styles';
import Label from './Label';
import {PriceTag, RatingCount, Rating1, DishTypes} from '../../components';
import {hearts} from '../../assets';
import {useNavigation} from '@react-navigation/native';

const window = Dimensions.get('window');
interface IProps {
  categories?: [];
  labelText?: string;
  title: string;
  rating?: number;
  dish1?: string;
  dish2?: string;
  dish3?: string;
  img: any;
  cardStyle: any;
  price?: number;
  ratingCount: number;
  dishType?: string;
  noLabel?: boolean;
  gridView?: boolean;
  onPress?: () => void;
  page: number;
  onpress1?: () => void;
  oldPrice?: any;
  diff: any;
  catId: any;
}

const Card: FC<IProps> = ({
  categories,
  img,
  labelText,
  title,
  rating,
  dish1,
  dish2,
  dish3,
  price,
  ratingCount,
  dishType,
  gridView,
  page,
  cardStyle,
  onPress,
  onpress1,
  oldPrice,
  diff,
  catId,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[S.main, cardStyle, gridView && S.mainRow]}>
      {!gridView ? (
        <View style={{marginTop: 5}}>
          {diff !== 'plan' ? (
            <View style={{alignSelf: 'flex-end'}}>
              <TouchableHighlight
                underlayColor=""
                onPress={() =>
                  navigation.navigate('SelectedCategory', {
                    categoryId: catId,
                  })
                }>
                <Text
                  style={{
                    opacity: 0.5,
                    fontSize: 11,
                    marginRight: -15,
                    top: 4,
                  }}>
                  View all
                </Text>
              </TouchableHighlight>
            </View>
          ) : null}

          <TouchableOpacity onPress={onPress}>
            <ImageBackground
              source={img}
              style={diff == 'plan' ? S.imageBackground2 : S.imageBackground}>
              <View style={S.flex}>
                <Label
                  labelText={labelText}
                  labelStyle={{
                    top: !labelText ? window.height * 1000 : 0,
                    bottom: !labelText ? -window.height * 1000 : 0,
                  }}
                />
                {/* <TouchableOpacity>
                <Image source={hearts} style={S.likeImage} />
              </TouchableOpacity> */}
              </View>
            </ImageBackground>
            <View style={S.textBar}>
              <Text style={S.title}>{title}</Text>

              {/* <PriceTag price={price} oldPrice={oldPrice} /> */}
              <View style={S.rating}>
                {/* <Rating1 /> */}
                {/* <RatingCount ratingCount={ratingCount} /> */}
                <DishTypes
                  categories={categories}
                  dish1={dish1}
                  dish2={dish2}
                  dish3={dish3}
                />
                <PriceTag price={price} oldPrice={oldPrice} />
              </View>
              <Text style={S.dishType}>{dishType?.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <View style={S.rowMain1}>
            <ImageBackground source={img} style={S.imageBackgroundRow}>
              <View style={S.flexRow}>
                <Label
                  labelText={labelText}
                  labelStyle={{
                    top: !labelText ? window.height * 1000 : 0,
                    bottom: !labelText ? -window.height * 1000 : 0,
                    width: 90,
                    marginTop: 35,
                  }}
                />
                {/* <TouchableOpacity>
                  <Image source={hearts} style={S.likeImageRow} />
                </TouchableOpacity> */}
              </View>
            </ImageBackground>
            <View style={S.textBarRow}>
              <Text style={S.title}>{title}</Text>
              <PriceTag price={price} />
              <View style={S.rating1}>
                <Rating1 />
                <RatingCount
                  ratingCount={ratingCount}
                  ratingStyle={{width: '20%'}}
                />
                <Text style={S.dishType}>{dishType?.toUpperCase()}</Text>
              </View>
              <DishTypes
                categories={categories}
                dish1={dish1}
                dish2={dish2}
                dish3={dish3}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Card;
