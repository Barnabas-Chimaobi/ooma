import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import S from './styles';
import Categories from './Categories';
import Header from './Header';
import {Button, ButtonType} from '../../../components';
import {RootState, AppDispatch} from '../../../store';
import {shuffleArray} from '../../../Utils/Helper';
import{ROBOTO} from '../../../fonts/index'
import {colors} from '../../../colors';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import Spinner from 'react-native-loading-spinner-overlay';
import Skeleton from './skeleton';
import BottomNav from '../../../navigation/BottomTabNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import ToggleSwitch from 'toggle-switch-react-native';
import {useNavigation} from '@react-navigation/native';
import { color } from 'react-native-reanimated';

const Home = () => {
  const navigation = useNavigation();
  const [switchs, setSwitchs] = useState(false);
  const menuItem = useSelector((state: RootState) => state.menuItem.payload);
  const menuItemSpecialOffer = useSelector((state: RootState) =>
    shuffleArray(state.menuItemsSpecialOffer.payload),
  );
  const newMenuItem = useSelector(
    (state: RootState) => state.newMenuItems.payload,
  );
  const popularMenuItem = useSelector(
    (state: RootState) => state.popularMenuItems.payload,
  );
  const menuPlansMenuItem = useSelector(
    (state: RootState) => state.menuItemPlanForYou.payload,
  );
  const drinksMenuItem = useSelector(
    (state: RootState) => state.drinkMenuItem.payload,
  );
  const breakFastMenuItem = useSelector(
    (state: RootState) => state.breakFastMenuItem.payload,
  );
  const glutenMenuItem = useSelector(
    (state: RootState) => state.glutenMenuItem.payload,
  );

  const {menuPlanCategories} = useSelector(
    (state: RootState) => state.menuPlanCategories,
  );

  //  const {categories} = useSelector(
  //    (state: RootState) => state.itemCategory,
  //  );

  // const menuItemsForYou = useSelector(
  //   (state: RootState) => state.menuItemsForYou.payload,
  // );
  // const historyMenuItems = useSelector(
  //   (state: RootState) => state.historyMenuItems.payload,
  // );
  // console.log(menuPlansMenuItem, "menuPlansMenuItem")

  const toggleFriend = () => setSwitchs((prevstate) => !prevstate);

  const toggleMenu = (from: number, data: []) => {
    const removedMenu = data.splice(from, 1);
    data.splice(0, 0, removedMenu[0]);
  };
  const firstCategory = drinksMenuItem?.map((item: any) => {
    return item?.MenuItemCategories[0];
  });
  const firstCategory1 = firstCategory?.map((item) => item?.ItemCategory?.name);
  const secondCategory = breakFastMenuItem?.map((item: any) => {
    return item?.MenuItemCategories[0];
  });
  const secondCategory1 = secondCategory?.map(
    (item) => item?.ItemCategory?.name,
  );
  const thirdCategory = glutenMenuItem?.map((item: any) => {
    return item?.MenuItemCategories[0];
  });
  const thirdCategory1 = thirdCategory?.map((item) => item?.ItemCategory?.name);

  // const firstDescription = drinksMenuItem?.map((item: any) => {
  //   return item?.MenuItemCategories[0];
  // });
  const firstDescription1 = firstCategory?.map(
    (item) => item?.ItemCategory?.description,
  );
  // const secondDescription = breakFastMenuItem?.map((item: any) => {
  //   return item?.MenuItemCategories[0];
  // });
  const secondDescription1 = secondCategory?.map(
    (item) => item?.ItemCategory?.description,
  );
  // const thirdDescription = glutenMenuItem?.map((item: any) => {
  //   return item?.MenuItemCategories[0];
  // });
  const thirdDescription1 = thirdCategory?.map(
    (item) => item?.ItemCategory?.description,
  );

  console.log(
    menuPlanCategories,
    firstCategory1,
    secondCategory1,
    thirdCategory1,
    '====actegoriesss ====eachcategorynaje',
  );

  console.log(menuPlansMenuItem, 'plapalapllappalappapalpapp');

  const renderItems = ({item}) => {
    return (
      <View style={{padding: 10, marginRight: 10,backgroundColor:colors.white}}>
        <TouchableHighlight
        style={{backgroundColor:colors.white}}
          underlayColor={colors.white}
          onPress={() =>
            navigation.navigate('MenuPlanByCategory', {
              categoryId: item?.id,
              // categoryName: categoryItems?.name
            })
          }>
          <View>
            <Image
              style={{height: 80, width: 80, borderRadius: 40}}
              source={{uri: item?.imageurl}}
            />
            <Text
              style={{textAlign: 'center', fontSize: 13, fontWeight: 'bold'}}>
              {item?.name}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View style={S.main}>
      <Header />
      <ScrollView>
        {menuItem.length == 0 ? (
          <Skeleton />
        ) : (
          <Categories
            title="Recommended for you"
            menuItem={menuItem}
            bool={menuItem.length == 0 ? true : false}
          />
        )}

        <View style={{backgroundColor:colors.white}}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Explore')}>
            <View
              style={{
                
                paddingVertical:5,
                flexDirection: 'row',
                backgroundColor: '#D30000',
                justifyContent:'space-between',
                alignItems:'center'
                
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize:15,
                  fontFamily:ROBOTO,
                  marginLeft:10,
                  fontWeight:'bold'
                }}>
                Order For a Friend
              </Text>
              <Icon
                color={colors.white}
                name="arrow-right"
                size={30}
              />
            </View>
          </TouchableWithoutFeedback>

          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={menuPlanCategories}
            keyExtractor={(item, index) => {
              // console.log(item.eventId.toString(), 'index');
              return index.toString();
            }}
            renderItem={renderItems}
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={4} // Reduce initial render amount
            maxToRenderPerBatch={4} // Reduce number in each render batch
            updateCellsBatchingPeriod={200} // Increase time between renders
            windowSize={10} // Reduce the window size
          />
        </View>
        {switchs == true ? (
          <Modal
            style={{
              backgroundColor: '#fff',
              // marginTop: '10%',
              marginBottom: '100%',
              width: '50%',
              alignSelf: 'center',
              height: 80,
              // borderTopEndRadius: 25,
              // borderTopStartRadius: 25,
            }}
            onBackdropPress={() => setSwitchs(false)}
            isVisible={false}>
            <View>
              <TouchableHighlight
                onPress={() => {
                  navigation.navigate('Explore'), setSwitchs(false);
                }}>
                <View>
                  <Text>Dish</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight>
                <View>
                  <Text
                    onPress={() => {
                      navigation.navigate('Menu'), setSwitchs(false);
                    }}>
                    Menu Plan
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </Modal>
        ) : null}

        {menuItemSpecialOffer?.length == 0 ? (
          <Skeleton />
        ) : (
          <Categories
            bool={menuItemSpecialOffer?.length == 0 ? true : false}
            menuItem={menuItemSpecialOffer}
            title="Special Offers"
            subtitle="Buy one, get one free. Bonuses ranging from free delivery services to extra meat."
          />
        )}

        {menuPlansMenuItem?.length == 0 ? (
          <Skeleton />
        ) : (
          <Categories
            bool={menuPlansMenuItem?.length == 0 ? true : false}
            menuItem={menuPlansMenuItem}
            title="Menu Plans For You"
            subtitle="Various Menu plans for pre-order on display."
            keys="plan"
          />
        )}

        {drinksMenuItem.length == 0 ? (
          <Skeleton />
        ) : (
          <Categories
            bool={drinksMenuItem.length == 0 ? true : false}
            menuItem={drinksMenuItem}
            title={firstCategory1[0]}
            subtitle={firstDescription1[0]}
          />
        )}

        {newMenuItem.length == 0 ? (
          <Skeleton />
        ) : (
          <Categories
            bool={newMenuItem.length == 0 ? true : false}
            menuItem={newMenuItem}
            title="New"
            subtitle="Fantastic items on the menu, for you."
          />
        )}

        {popularMenuItem.length == 0 ? (
          <Skeleton />
        ) : (
          <Categories
            bool={popularMenuItem.length == 0 ? true : false}
            menuItem={popularMenuItem}
            title="Popular"
            subtitle="Based On searches. We Picked these for you"
          />
        )}

        {glutenMenuItem.length == 0 ? (
          <Skeleton />
        ) : (
          <Categories
            bool={glutenMenuItem.length == 0 ? true : false}
            menuItem={breakFastMenuItem}
            title={secondCategory1[0]}
            subtitle={secondDescription1[0]}
          />
        )}

        {breakFastMenuItem.length == 0 ? (
          <Skeleton />
        ) : (
          <Categories
            bool={breakFastMenuItem.length == 0 ? true : false}
            menuItem={glutenMenuItem}
            title={thirdCategory1[0]}
            subtitle={thirdDescription1[0]}
          />
        )}

        {/* {historyMenuItems.length == 0 ? (
          <Skeleton />
        ) : (
          <Categories
            bool={historyMenuItems.length == 0 ? true : false}
            title="Healthy"
            subtitle="Keep a health lifestyle"
            menuItem={historyMenuItems}
          />
        )}

        {menuItemsForYou.length == 0 ? (
          <Skeleton />
        ) : (
          <Categories
            bool={menuItemsForYou.length == 0 ? true : false}
            menuItem={menuItemsForYou}
            title="More for you"
            subtitle="Explore many other dishes on the menu."
          />
        )} */}

        <Button
          title="BROWSE MORE MENU"
          type={ButtonType.outline}
          buttonStyle={S.browseButtonStyle}
          titleStyle={S.browseTitleStyle}
          onPress={() => {}}
        />
        <Button
          title="BACK TO TOP"
          type={ButtonType.outline}
          buttonStyle={S.backTopButtonStyle}
          titleStyle={S.backtopTitleStyle}
          onPress={() => {}}
        />
      </ScrollView>
      {/* <BottomNav /> */}
    </View>
  );
};

export default Home;
