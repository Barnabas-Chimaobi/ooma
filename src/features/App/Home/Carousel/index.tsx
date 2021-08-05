import Carousel from 'react-native-snap-carousel';
import React, {useState, FC, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
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
  const _renderItem = ({item}: any) => {
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
      <Card1
        id={item.id}
        image={{uri: item.imageurl}}
        title={item?.name}
        // rating={item.rating}
        // star={item.star}
        description={item.MenuPlanCategory.name}
        // compType={'menuPlanDetail'}
      />
    ) : (
      <Card
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
    <Carousel
      loop={true}
      // ref={(c) => {
      //       carousel = c;
      //     }}
      data={menuItem}
      renderItem={_renderItem}
      sliderWidth={380}
      itemWidth={350}
      activeSlideAlignment="start"
    />
  );
};

const cardStylse = {
  width: '100%',
  alignSelf: 'center',
  marginLeft: 15,
};
export default MyCarousel;
