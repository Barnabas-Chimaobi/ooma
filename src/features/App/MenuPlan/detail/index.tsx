import React, {useState, FC, useEffect} from 'react';
import moment from 'moment';
import {
  View,
  Dimensions,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import DateTimePicker from '@react-native-community/datetimepicker';

import Afternoon from './afternoon';
import Morning from './morning';
import Night from './night';

import {Basket} from '../../../../components/Basket/index';
import {useNavigation} from '@react-navigation/native';
import SimpleHeader from '../../../../components/HeaderBar/simpleHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getMenuPlansById,
  getMenuPlanTime,
  getMenuPlanDetailBydateAndtypePlanId,
  getMenuPlanCart,
} from '../../../../FetchData';
import {DateFormatter} from '../../../../Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {basketStates} from '../../../../reducers/basket';
import {AppDispatch, RootState} from '../../../../store';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

interface IProps {
  route?: {};
}

const initialLayout = {width: Dimensions.get('window').width};
const MenuDetails: FC<IProps> = ({route}) => {
  const dispatch: AppDispatch = useDispatch();
  const basketItem = useSelector(
    (state: RootState) => state.basketState.payload,
  );

  const {planId} = route?.params;

  const MorningRoute = () => (
    <View style={styles.scene}>
      <Morning morning={morning} planIds={planId} />
    </View>
  );

  const AfternoonRoute = () => (
    <View style={styles.scene}>
      <Afternoon afternoon={morning} planIds={planId} />
    </View>
  );

  const NightRoute = () => (
    <View style={styles.scene}>
      <Night night={morning} planIds={planId} />
    </View>
  );

  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [date, setDate] = useState();
  const [date1, setDate1] = useState();
  const [menuPlan, setMenuPlan] = useState();
  const [morning, setMorning] = useState();
  const [planType, setPlanType] = useState('Morning');
  const [planCart, setPlanCart] = useState('');
  const [startDate, setStartDates] = useState('');
  const [endDate, setEndDates] = useState('');

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
    setMorning(morningorAfterOrEve);
    console.log(date, 'morningsssss');
  };

  const getMenuplanKart = async () => {
    const userId = await AsyncStorage.getItem('userId');
    console.log(userId, 'useriddd');

    const menuplanscart = await getMenuPlanCart(userId);
    setPlanCart(menuplanscart?.items);
    // console.log(
    //   menuplanscart?.items.map((item: any) => item.MenuPlan),
    //   '=======planscarttttttt=========',
    // );
    dispatch(basketStates(menuplanscart?.items));
    const all = menuplanscart?.items.map((item: any) => item.MenuPlan);
    let all1 = all.map((item: any) => item.MenuPlanDetails);
    console.log(menuplanscart, '=====all1======');
  };

  useEffect(() => {
    const getMenuPlanDetails = async () => {
      const menuPlansDetail = await getMenuPlansById(planId);
      setMenuPlan(menuPlansDetail);
      let d1 = new Date(menuPlansDetail?.startDate).toISOString();
      let d2 = new Date(menuPlansDetail?.endDate).toISOString();
      setStartDates(d1.substring(0, 10).toString());
      setEndDates(d2.substring(0, 10).toString());
      console.log(
        menuPlansDetail,
        d1.substring(0, 10).toString(),
        d2.substring(0, 10).toString(),
        'menuplandetailsconsoled',
      );
    };

    // const getMenuplanKart = async () => {
    //   const menuplanscart = await getMenuPlanCart();
    //   setPlanCart(menuplanscart?.items);
    //   // console.log(
    //   //   menuplanscart?.items.map((item: any) => item.MenuPlan),
    //   //   '=======planscarttttttt=========',
    //   // );
    //   const all = menuplanscart?.items.map((item: any) => item.MenuPlan);
    //   let all1 = all.map((item: any) => item.MenuPlanDetails);
    //   console.log(all1, '=====all1======');
    // };

    console.log(date, planId, planType, 'consoleedddddsss');
    const unsubscribe = navigation.addListener('focus', () => {
      getMenuplanKart();
    });
    getMenuPlanDetails();
    getMenuplanKart();
    getMorningAfternoonNight('Morning');
  }, [date]);

  console.log(planId);

  const onChanges = (e: any, selectedDate: any) => {
    const newDate = JSON.stringify(selectedDate).substring(1, 11);

    console.log(planType, '======plantype=====');
    console.log(selectedDate, '======plandatesssss======');
    const currentDate = newDate || date;
    setDate1(selectedDate || date1);
    setDate(currentDate);
    setShow(Platform.OS === 'ios');
    // setTimeout(() => {
    getMorningAfternoonNight(planType, currentDate);
    // }, 5000);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const [routes] = useState([
    {key: 'morning', title: 'Morning'},
    {key: 'afternoon', title: 'Afternoon'},
    {key: 'night', title: 'Night'},
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

  const TabViewContent = () => (
    <TabView
      renderTabBar={(routers) => (
        <TabBar
          {...routers}
          onTabPress={({route, preventDefault}) => {
            getMorningAfternoonNight(
              route.key == 'morning'
                ? 'Morning'
                : route.key == 'afternoon'
                ? 'Afternoon'
                : route.key == 'night'
                ? 'Evening'
                : null,
            ),
              console.log(route, '======routerssss=====');
          }}
          indicatorStyle={styles.indicatorStyle}
          style={styles.tabBar}
          renderLabel={({route, focused}) => {
            return (
              <Text style={focused ? styles.focused : styles.tabLabel}>
                {route.title}
              </Text>
            );
          }}
        />
      )}
      onSwipeStart={() => {
        console.log(route, '=====routess=======');
        // getAfternoonAndEvening('Afternoon');
      }}
      swipeEnabled={false}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );

  let one = '2021-08-22';
  return (
    <>
      <SimpleHeader
        style={{position: 'absolute', top: 0, zIndex: 555, paddingLeft: 10}}
        icon={<AntDesign color="white" name="arrowleft" size={28} />}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {menuPlan?.description || 'Loading...'}
        </Text>
        <View style={styles.dark} />
        <Image
          style={{width: '100%', height: 300}}
          source={{uri: menuPlan?.imageurl}}
        />
      </View>
      <View style={styles.list}>
        <Basket
          counts={basketItem?.length}
          onBasketPress={() =>
            navigation.navigate('Cart', {
              menu: routes,
              routeIndex: index,
              cartItems: planCart,
            })
          }
        />
        <View style={styles.line} />
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.calendar}
                onPress={() => showDatepicker()}>
                <Image source={require('../assets/calendar3.png')} />
                <Text>
                  {DateFormatter.date2(date) || new Date().toLocaleDateString()}
                </Text>

                {/* <Text>{moment(date).format('D-MM-YYYY')}</Text> */}
              </TouchableOpacity>

              {show && (
                // <DateTimePicker
                //   // testID="dateTimePicker"
                //   value={date || new Date()}
                //   mode="date"
                //   // is24Hour={true}
                //   display="default"
                //   onChange={(e: any) => onChanges(e)}
                // />

                <Calendar
                  // markingType="multi-period"
                  // markingType={'multi-dot'}
                  markedDates={{
                    one: {textColor: 'green', selected: true},
                    two: {
                      startingDay: true,
                      color: 'green',
                      selected: true,
                    },
                    '2021-08-23': {
                      selected: true,
                      endingDay: true,
                      color: 'green',
                      textColor: 'gray',
                    },
                    '2021-08-24': {
                      selected: true,
                      startingDay: true,
                      color: 'green',
                      endingDay: true,
                    },
                  }}
                  disabledByDefault={true}
                />

                // <DateTimePicker
                //   testID="dateTimePicker"
                //   value={date1 || new Date()}
                //   mode={'date'}
                //   is24Hour={true}
                //   display="default"
                //   onChange={onChanges}
                // />
              )}

              <Text style={styles.date}>
                {DateFormatter.date2(date) || new Date().toLocaleDateString()}
              </Text>
              {/* <Text style={styles.date}>
          {moment(date).format('ddd, Do MMM, YYYY')}
        </Text> */}
              <View style={{marginBottom: -30}}>
                <TabViewContent />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default MenuDetails;
