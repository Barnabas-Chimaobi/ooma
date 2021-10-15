import React, { useState, FC, useEffect } from 'react';
import moment from 'moment';
import {
  View,
  Dimensions,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StatusBar,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import { styles } from './styles';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DateTimePicker from '@react-native-community/datetimepicker';

import Afternoon from './afternoon';
import Morning from './morning';
import Night from './night';

import { Basket } from '../../../../components/Basket/index';
import { useNavigation } from '@react-navigation/native';
import SimpleHeader from '../../../../components/HeaderBar/simpleHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getMenuPlansById,
  getMenuPlanTime,
  getMenuPlanDetailBydateAndtypePlanId,
  getMenuPlanCart,
} from '../../../../FetchData';
import { DateFormatter } from '../../../../Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { basketStates } from '../../../../reducers/basket';
import { AppDispatch, RootState } from '../../../../store';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { NativeBaseProvider, Box } from 'native-base';
import Footer from '../../../../navigation/footer';
import {StyleFoot} from '../../../../navigation/styles';
import {colors} from '../../../../colors';
import {basket, loader} from '../../../../assets';

interface IProps {
  route?: {};
}

const initialLayout = { width: Dimensions.get('window').width };
const MenuDetails: FC<IProps> = ({ route }) => {
  const dispatch: AppDispatch = useDispatch();
  const basketItem = useSelector(
    (state: RootState) => state.basketState.payload,
  );

  const { planId } = route?.params;

  const MorningRoute = () => (
    <View style={styles.scene}>
      <Morning
        times={deliveryTime}
        allTime={allTimeForEachMeal}
        morning={morning}
        planIds={planId}
      />
    </View>
  );

  const AfternoonRoute = () => (
    <View style={styles.scene}>
      <Afternoon
        allTime={allTimeForEachMeal}
        times={deliveryTime}
        afternoon={morning}
        planIds={planId}
      />
    </View>
  );

  const NightRoute = () => (
    <View style={styles.scene}>
      <Night
        allTime={allTimeForEachMeal}
        times={deliveryTime}
        night={morning}
        planIds={planId}
      />
    </View>
  );

  const navigation = useNavigation();
  const [meal, setMeal] = useState('meal');
  const [index, setIndex] = useState(0);
  const [date, setDate] = useState();
  const [date1, setDate1] = useState();
  const [menuPlan, setMenuPlan] = useState();
  const [morning, setMorning] = useState('');
  const [planType, setPlanType] = useState('Morning');
  const [planCart, setPlanCart] = useState('');
  const [startDate, setStartDates] = useState('');
  const [endDate, setEndDates] = useState('');
  const [marked, setMarked] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [refreshing, setRefreshing] = useState(true);
  const [allTimeForEachMeal, setAllTimeForEachMeal] = useState(null);

  const [show, setShow] = useState(false);

  console.log(planId, '====laningplanniiingg======');

  // getMenuPlansById;

  const getMorningAfternoonNight = async (item: any, newdate: any) => {
    setPlanType(item);
    const news = new Date().toISOString();
    console.log(news.substring(0, 10), '====new dateeee=====');
    const morningorAfterOrEve = await getMenuPlanDetailBydateAndtypePlanId(
      newdate == undefined ? news.substring(0, 10) : newdate,
      '1',
      planId,
      item,
    );

    var uniq = {};
    var arrFiltered = morningorAfterOrEve?.filter(
      (obj) => !uniq[obj.MenuItem.id] && (uniq[obj.MenuItem.id] = true),
    );
    setMorning(arrFiltered);
    setAllTimeForEachMeal(morningorAfterOrEve);
    const getPlanTimes = arrFiltered?.map((item: any) => {
      return {
        label: item?.deliveryTime,
        value: item?.deliveryTime,
        amount: item?.deliveryTime,
        id: item?.deliveryTime,
      };
    });
    setDeliveryTime(getPlanTimes);
    console.log(getPlanTimes, 'plantimesssss===========');

    console.log('arrFiltered=================', arrFiltered);
    console.log(morningorAfterOrEve, 'morningsssss');
  };

  const getMenuplanKart = async () => {
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
    const userId = await AsyncStorage.getItem('userId');
    console.log(userId, 'useriddd');

    const menuplanscart = await getMenuPlanCart(userId, newbranch);
    setPlanCart(menuplanscart?.items);
    // console.log(
    //   menuplanscart?.items.map((item: any) => item.MenuPlan),
    //   '=======planscarttttttt=========',
    // );
    dispatch(basketStates(menuplanscart?.items));
    const all = menuplanscart?.items?.map((item: any) => item.MenuPlan);
    let all1 = all?.map((item: any) => item.MenuPlanDetails);
    console.log(menuplanscart, '=====all1======');
  };

  const getMenuPlanDetails = async () => {
    const menuPlansDetail = await getMenuPlansById(planId);
    setMenuPlan(menuPlansDetail);
    let d1 = new Date().toISOString().substring(0, 10);
    let d2 = new Date(menuPlansDetail?.endDate).toISOString().substring(0, 10);
    setEndDates(d2);
    var now = new Date(d2);
    var daysOfYear = [];
    for (var d = new Date(d1); d <= now; d.setDate(d.getDate() + 1)) {
      daysOfYear.push(d.toISOString().substring(0, 10));
    }

    let newDaysObject = {};
    daysOfYear.forEach((day) => {
      newDaysObject[day] = {
        selected: true,
        marked: true,
        color: '#50cebb',
        textColor: 'green',
      };
    });
    console.log(newDaysObject, '=======dayssssssssssssss-=========');
    setMarked(newDaysObject);
    setRefreshing(false);
    // loopDate();
  };

  const checkIfPlanExist = (item: any, plans: any) => {
    for (const plan of plans) {
      if (plan.itemData.id == item.itemData.id) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    console.log(date, planId, planType, 'consoleedddddsss');
    const unsubscribe = navigation.addListener('focus', () => {
      getMenuplanKart();
    });
    getMenuPlanDetails();
    getMenuplanKart();
    getMorningAfternoonNight('Morning', null);
  }, []);

  // const mark = {
  //   [startDate]: {
  //     startingDay: true,
  //     color: '#50cebb',
  //     textColor: 'white',
  //     marked: true,
  //   },
  //   [endDate]: {endingDay: true, color: '#50cebb', textColor: 'white'},
  // };

  const mark = {
    [startDate]: {
      // startingDay: true,
      color: '#50cebb',
      textColor: 'white',
      marked: true,
      selected: true,
    },
    [endDate]: {
      // endingDay: true,
      color: '#50cebb',
      textColor: 'white',
      marked: true,
      selected: true,
    },
  };

  console.log(planId);

  const onChanges = (e: any, selectedDate: any) => {
    let newToday = new Date().toISOString().substring(0, 10);
    console.log(e, newToday, selectedDate, 'datesssssssssssconsolll=======');

    // setTimeout(() => {

    if (e?.dateString > newToday && e?.dateString <= endDate) {
      const newDate = e?.dateString;
      // const newDate = JSON.stringify(e).substring(1, 11);
      console.log(planType, '======plantype=====');
      console.log(selectedDate, '======plandatesssss======');
      const currentDate = newDate || date;
      setDate1(e?.dateString || date1);
      setDate(currentDate);
      setShow(Platform.OS === 'ios');
      getMorningAfternoonNight(planType, currentDate);
    }
    // }, 5000);
  };

  const showMode = (currentMode: any) => setShow((prev) => !prev);

  const showDatepicker = () => {
    showMode('date');
  };

  const [routes] = useState([
    { key: 'morning', title: 'Morning' },
    { key: 'afternoon', title: 'Afternoon' },
    { key: 'night', title: 'Evening' },
  ]);

  const renderScene = SceneMap({
    morning: MorningRoute,
    afternoon: AfternoonRoute,
    night: NightRoute,
  });

  const getAfternoonAndEvening = async (item: any) => {
    setPlanType(item);
    // await getMorningAfternoonNight();
  };

  const onRefresh = () => {
    getMenuPlanDetails();
  };

  const TabViewContent = () => (
    <TabView
      renderTabBar={(routers) => (
        <TabBar
          {...routers}
          onTabPress={({ route, preventDefault }) => {
            getMorningAfternoonNight(
              route.key == 'morning'
                ? 'Morning'
                : route.key == 'afternoon'
                  ? 'Afternoon'
                  : route.key == 'night'
                    ? 'Evening'
                    : null,
              date,
            );
            // console.log(route, '======routerssss=====');
          }}
          indicatorStyle={styles.indicatorStyle}
          style={styles.tabBar}
          renderLabel={({ route, focused }) => {
            return (
              <Text style={focused ? styles.focused : styles.tabLabel}>
                {route.title}
              </Text>
            );
          }}
        />
      )}
      onSwipeStart={() => {
        // console.log(route, '=====routess=======');
        // getAfternoonAndEvening('Afternoon');
      }}
      swipeEnabled={false}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );

  let one = '2021-08-22';
  return (
    <>
      <SimpleHeader
        style={{ position: 'absolute', top: 0, zIndex: 555, paddingLeft: 10 }}
        icon={<AntDesign color="white" name="arrowleft" size={28} />}
      />
      {show && (
        <View style={{zIndex: 1, position: 'relative', height: 400}}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 22,
              fontFamily: 'Poppins',
            }}>
            Select a Date
          </Text>
          <Calendar
            // markingType={'period'}
            // markingType="multi-period"
            // markingType={'multi-dot'}
            markedDates={marked}
            onDayPress={(day) => {
              onChanges(day), setShow(false);
            }}
            disabledByDefault={true}
          />
        </View>
      )}
      {!show && (
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {menuPlan?.description || 'Loading...'}
          </Text>
          <View style={styles.dark} />
          <Image
            style={{width: '100%', height: 300, zIndex: 10}}
            source={{uri: menuPlan?.imageurl}}
          />
        </View>
      )}

      <View style={styles.list}>
        {/* <Basket
          counts={basketItem?.length}
          onBasketPress={() =>
            navigation.navigate('Cart', {
              menu: routes,
              routeIndex: index,
              cartItems: planCart,
            })
          }
        /> */}
        <View style={styles.line} />
        <View style={{ flex: 1 }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                tintColor={'green'}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }>
            <View style={{flex: 1, paddingBottom: 100}}>
              {!show && (
                <View>
                  <TouchableOpacity
                    style={styles.calendar}
                    onPress={() => showDatepicker()}>
                    <Image source={require('../assets/calendar3.png')} />
                    <Text>{DateFormatter.date2(date) || 'Select a Date'}</Text>

                    {/* <Text>{moment(date).format('D-MM-YYYY')}</Text> */}
                  </TouchableOpacity>

                  <Text style={styles.date}>
                    {DateFormatter.date2(date) || new Date().toDateString()}
                  </Text>
                </View>
              )}

              {/* <Text style={styles.date}>
          {moment(date).format('ddd, Do MMM, YYYY')}
        </Text> */}
              <View style={{}}>
                <TabViewContent />
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            height: 60,
            width: '98%',
            backgroundColor: colors.green,
            position: 'absolute',
            bottom: 30,
            alignSelf: 'center',
            // flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <TouchableHighlight
            underlayColor=""
            onPress={() =>
              navigation.navigate('Cart', {
                menu: routes,
                routeIndex: index,
                cartItems: planCart,
              })
            }>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                // left: '20%',
                flex: 1,
                justifyContent: 'space-between',
                // alignContent: 'center',

                // right: '10%',
              }}>
              <Image
                style={{height: 28, width: 28, right: 11}}
                source={basket}
              />
              <Text
                style={{
                  color: colors.white,
                  fontSize: 24,
                  fontFamily: 'Open-Sans',
                  fontWeight: '800',
                  right: 5,
                }}>
                View Basket
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.white,
                }}>
                {'\u2B24'}
              </Text>
              {basketItem?.length !== 0 && basketItem?.length !== undefined ? (
                <Text style={{color: colors.white, fontSize: 20, left: 5}}>
                  ({basketItem?.length})
                </Text>
              ) : null}
            </View>
          </TouchableHighlight>
        </View>
      </View>

      {/* <View style={StyleFoot.footer}>
        <Footer navigation={navigation} meal={meal} />
      </View> */}
    </>
  );
};

export default MenuDetails;
