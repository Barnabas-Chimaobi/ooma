import Carousel from 'react-native-snap-carousel';
import React, {useState, FC, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import {Card} from '../../../../components';
import Card1 from '../../MenuPlan/components/menuCards/card';
import {useNavigation} from '@react-navigation/native';
import {RootState, AppDispatch} from '../../../../store';
import {
  getRegion,
  getBranches,
  getMenuItemsByBranch,
  getMenuItemsSpecialOffer,
  getMenuItemsPopular,
  getMenuItemsNew,
} from '../../../../FetchData';
import {getMenuItems} from '../../../../reducers/MenuItems';
import {getSpecialOffer} from '../../../../reducers/SpecialOffer';
import {getNewItem} from '../../../../reducers/NewMenuItem';
import {getPopularItem} from '../../../../reducers/PopularItem';
import {getMenuItemsForYou} from '../../../../reducers/MoreForYouMenu';
import {getMenuItemsPlanForYou} from '../../../../reducers/MenuPlansForYou';
import {getGlutenMenuItems} from '../../../../reducers/GlutenFreeMenu';
import {getDrinkMenuItems} from '../../../../reducers/DrinkMenu';
import {getBreakFastMenuItems} from '../../../../reducers/BreakFastMenu';
import {getMenuItemsHistory} from '../../../../reducers/HistoryMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native';
import styles from './styles';
import {hearts, scroll} from '../../../../assets';
import {colors} from '../../../../colors';

interface CarouselProps {
  menuItem?: [];
  page?: number;
  keyProp: string;
}
const MyCarousel: FC<CarouselProps> = ({menuItem, page = 1, keyProp}) => {
  const dispatch: AppDispatch = useDispatch();
  const [branchId, setBranchId] = useState('');
  const [pages, setPage] = useState(1);

  useEffect(() => {
    const handleData = async () => {
      const regionIds = await AsyncStorage.getItem('branchId');
      setBranchId(String(regionIds));
      console.log(regionIds, 'idddddsss');
    };

    // handleData();
  }, []);

  const navigation = useNavigation();
  const _renderItem = ({item, index}: any) => {
    // console.log(item, 'item');
    let Image_Http_URL = {uri: item.imageUrl};
    const mainRating = item?.rating / item?.ratingCount;
    const discount = item?.discount;
    const currentAmount = discount
      ? (item?.amount - discount).toFixed(2)
      : item?.amount;
    // const mainCurrentAmount = currentAmount?.includes('.')
    //   ? currentAmount
    //   : currentAmount;
    const oldPrice = discount ? item?.amount : null;
    return keyProp == 'plan' ? (
      // <Card1
      //   id={item.id}
      //   image={{uri: item.imageurl}}
      //   title={item?.name}
      //   // rating={item.rating}
      //   // star={item.star}
      //   description={item.MenuPlanCategory.name}
      //   // compType={'menuPlanDetail'}
      // />

      <View
        style={{
          backgroundColor: colors.white,
          marginBottom: 15,
          elevation: 5,
          // width: '98%',
          borderRadius: 10,
          padding: 10,
          paddingLeft: -5,
          // marginLeft: 2,
        }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              console.log(item.id, 'props.id');
              navigation.navigate('Detail', {planId: item.id});
            }}>
            <View style={styles.container} key={item.imageurl}>
              <ImageBackground
                source={{uri: item.imageurl}}
                style={styles.menuImage}>
                {/* <TouchableOpacity>
                  <Image
                    source={hearts}
                    style={{marginEnd: 12, alignSelf: 'flex-end', top: 10}}
                  />
                </TouchableOpacity> */}
              </ImageBackground>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item?.name}</Text>
                <View style={styles.ratingContainer}>
                  {/* <Text>{props.rating}</Text> */}
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                {/* <Image source={square} style={styles.ratingStar} /> */}
                <Text style={styles.description}>
                  {item?.description.trim()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 7}}>
          <TouchableHighlight
            underlayColor=""
            onPress={() =>
              // navigation.navigate('Menu')
              navigation.navigate('Detail', {planId: item.id})
            }>
            <View
              style={{
                // maxWidth: 130,
                // maxWidth: 100,
                width: '33%',
                backgroundColor: colors.start,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  // marginTop: '-8%',
                  color: colors.white,
                  width: 140,
                  padding: 8,
                  marginLeft: -4,
                  // paddingBottom: 5,
                  marginBottom: 5,
                }}>
                CREATE PLAN
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    ) : (
      <Card
        keyProp={keyProp}
        catId={item.MenuItemCategories[0]?.itemCategoryId}
        page={page}
        img={Image_Http_URL}
        labelText={item.caption}
        title={item.itemName}
        rating={mainRating || 0}
        price={currentAmount}
        ratingCount={item.ratingCount != null ? mainRating : 1}
        dishType={item.menuItemType}
        categories={item.MenuItemCategories}
        oldPrice={oldPrice}
        cardStyle={cardStylse}
        onPress={() =>
          navigation.navigate('Dish', {
            id: item.id,
            rating: mainRating,
            img: Image_Http_URL,
          })
        }
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Carousel
        loop={true}
        // ref={(c) => {
        //       carousel = c;
        //     }}
        data={menuItem}
        renderItem={_renderItem}
        // sliderWidth={Dimensions.get('window').width}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width / 1.12}
        activeSlideAlignment="start"
        slideStyle={{zIndex: 10, flex: 1}}
      />
    </SafeAreaView>
  );
};

const cardStylse = {
  width: '100%',
  alignSelf: 'center',
  marginLeft: 15,
};
export default MyCarousel;
