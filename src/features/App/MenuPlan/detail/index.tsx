import React, {useState, FC, useEffect} from 'react';
import moment from 'moment';
import {
  View,
  Dimensions,
  Text,
  Image,
  Platform,
  TouchableOpacity,
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

interface IProps {
  route?: {};
}

const initialLayout = {width: Dimensions.get('window').width};

const MenuDetails: FC<IProps> = ({route}) => {
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

  const [show, setShow] = useState(false);

  console.log(planId, '====laningplanniiingg======');

  // getMenuPlansById;

  const getMorningAfternoonNight = async (item: any, newdate: any) => {
    setPlanType(item);

    const morningorAfterOrEve = await getMenuPlanDetailBydateAndtypePlanId(
      newdate == undefined ? '2021-06-01' : newdate,
      '1',
      'e2594184-ba9a-4c22-8a7a-106d8ae7bff1',
      item,
    );
    setMorning(morningorAfterOrEve);
    console.log(date, 'morningsssss');
  };

  useEffect(() => {
    const getMenuPlanDetails = async () => {
      const menuPlansDetail = await getMenuPlansById(planId);
      setMenuPlan(menuPlansDetail);
      console.log(menuPlansDetail, 'menuplandetailsconsoled');
    };

    const getMenuplanKart = async () => {
      const menuplanscart = await getMenuPlanCart();
      setPlanCart(menuplanscart?.items);
      // console.log(
      //   menuplanscart?.items.map((item: any) => item.MenuPlan),
      //   '=======planscarttttttt=========',
      // );
      const all = menuplanscart?.items.map((item: any) => item.MenuPlan);
      let all1 = all.map((item: any) => item.MenuPlanDetails);
      console.log(all1, '=====all1======');
    };

    console.log(date, planId, planType, 'consoleedddddsss');

    getMenuPlanDetails();
    getMenuplanKart();
    getMorningAfternoonNight('Morning');
  }, [date]);

  console.log(planId);

  const onChanges = (e: any, selectedDate: any) => {
    const newDate = JSON.stringify(selectedDate).substring(1, 11);

    console.log(planType, '======plantype=====');
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
          counts={planCart?.length}
          onBasketPress={() =>
            navigation.navigate('Cart', {
              menu: routes,
              routeIndex: index,
              cartItems: planCart,
            })
          }
        />
        <View style={styles.line} />
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
          //   onChange={(e: any) => onChange(e)}
          // />

          <DateTimePicker
            testID="dateTimePicker"
            value={date1 || new Date()}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChanges}
          />
        )}

        <Text style={styles.date}>
          {DateFormatter.date2(date) || new Date().toLocaleDateString()}
        </Text>
        {/* <Text style={styles.date}>
          {moment(date).format('ddd, Do MMM, YYYY')}
        </Text> */}
        <TabViewContent />
      </View>
    </>
  );
};

export default MenuDetails;
