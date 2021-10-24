import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  TouchableWithoutFeedback,
  View,
  BackHandler,
  StyleSheet,
  Text,
  Platform,
  FlatList,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';
import CurrentOrder from './Current';
import OrderHistory from './History';
import UpcomingOrder from './Upcoming';
import OrderDetails from './OrderDetails';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SimpleHeader, CheckBox1} from '../../../components';
import {colors} from '../../../colors';
import Footer from '../../../navigation/footer';
import {StyleFoot} from '../../../navigation/styles';
import {useDispatch, useSelector} from 'react-redux';
import {itemOrderStates} from '../../../reducers/menuItemOrder';
import {AppDispatch, RootState} from '../../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getMenuItemOrders} from '../../../FetchData';
import {Total, EmptyList} from '../../../components';
import {emptyCart} from '../../../assets';

// import {getMenuitemCart} from '../../../FetchData';

const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const OrderTab = () => {
  const itemOrders = useSelector(
    (state: RootState) => state.itemOrderState.payload,
  );
  const dispatch: AppDispatch = useDispatch();

  const navigation = useNavigation();
  const [more, setMore] = useState('more');
  const [order, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const {itemOrder} = route.params;

  const getOrders = async () => {
    if (itemOrders?.length === 0) {
      setLoading(true);
    }
    getOrderFromRedux();
    const userId = await AsyncStorage.getItem('userId');
    console.log(userId, 'useriddd');
    // const gottenId = JSON.parse(userId);

    try {
      // console.log(newsum, 'cartttttt');
      const orders = await getMenuItemOrders(userId);
      dispatch(itemOrderStates(orders?.items));

      // orders?.items?.forEach((item: any) => {
      //   groupByDate(item, basketData);
      // });
      // basketData.forEach((item: any) => {
      //   //replace the already exist data with the grouped plan data
      //   item['data'] = groupByPlanTypeDate(item.data);
      // });

      // await setOrders(basketData);
      //  await dispatch(cartStates(menuICart?.items));
      // console.log(basketData, 'cart ===value');
      // console.log(orders?.items, 'cart ===value');
      setLoading(false);
      // return basketData;
      // setRefreshing(false);
    } catch (error) {
      console.log(error, '====errorrsss====');
      // setRefreshing(false);
    }
  };

  const getOrderFromRedux = () => {
    let basketData: any = [];
    itemOrders?.forEach((item: any) => {
      groupByDate(item, basketData);
    });
    basketData.forEach((item: any) => {
      //replace the already exist data with the grouped plan data
      item['data'] = groupByPlanTypeDate(item.data);
    });

    basketData.sort(function (a, b) {
      var dateA: any = new Date(a.deliveryTime),
        dateB: any = new Date(b.deliveryTime);
      return dateB - dateA;
    });
    setOrders(basketData);

    //  await dispatch(cartStates(menuICart?.items));
    // console.log(basketData, 'cart ===value');
    // console.log(orders?.items, 'cart ===value');
    setLoading(false);
    return basketData;
  };

  const groupByDate = (itemData: any, basketItems: any) => {
    // console.log(basketItems, 'basketitems====');
    for (const item of basketItems) {
      // console.log(
      //   itemData?.menuitemorders?.createdAt,
      //   item,
      //   'iiiiiiiiiitems====',
      // );
      if (
        new Date(itemData?.menuitemorders?.createdAt)?.toLocaleDateString() ==
        new Date(item?.deliveryTime)?.toLocaleDateString()
      ) {
        item.data.push({
          planType: itemData?.menuitemorders?.createdAt,
          itemData,
        });

        return;
      }
    }
    // if the basket item date doesnt exist before
    basketItems.push({
      deliveryTime: itemData?.menuitemorders?.createdAt,
      status: itemData?.menuitemorders?.status,
      data: [{itemData}],
    });
  };

  const groupByPlanTypeDate = (basketItems: any) => {
    let planTypeData: any = [];
    let planTypeArray: any = [];
    for (const item of basketItems) {
      if (planTypeData?.length == 0) {
        planTypeData.push({
          planType: item?.planType,
          data: [{itemData: item?.itemData}],
        });
        planTypeArray.push(item?.planType);
      } else {
        for (const planData of planTypeData) {
          if (planData.planType == item?.planType) {
            if (!checkIfPlanExist(item, planData?.data)) {
              planData.data.push({itemData: item?.itemData});
            }
            break;
          }
          //Ensure that unique plantype exist
          if (!planTypeArray.includes(item?.planType)) {
            planTypeData.push({
              planType: item?.planType,
              data: [{itemData: item?.itemData}],
            });
            planTypeArray.push(item?.planType);
          }
        }
      }
    }
    return planTypeData;
  };

  const checkIfPlanExist = (item: any, plans: any) => {
    for (const plan of plans) {
      if (plan?.itemData?.id == item?.itemData?.id) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    getOrders();
    // console.log(itemOrder, 'itemorderssss======');
  }, [itemOrders?.length && loading === true]);

  const Current = () => <CurrentOrder item={order} />;

  const Upcoming = () => <UpcomingOrder item={order} />;

  const History = () => <OrderHistory item={order} />;

  const onrefresh = () => {
    setLoading(true);
    getOrders();
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#303030',
          paddingLeft: 10,
        }}>
        <StatusBar
          hidden={false}
          backgroundColor="#303030"
          barStyle={'dark-content'}
        />

        <SimpleHeader color={colors.white} />
        <Text
          style={{
            color: 'white',
            padding: 20,
            paddingLeft: 20,
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          My Order
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={onrefresh}
            size={20}
            refreshing={loading}
          />
        }>
        <View>
          {itemOrders?.length === 0 ? (
            <View style={{textAlign: 'center', marginTop: 60}}>
              <ActivityIndicator
                animating={true}
                size={'large'}
                color={'green'}
              />
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 120,
                  fontFamily: 'Montserrat',
                }}>
                Getting your order details ready..
              </Text>
            </View>
          ) : // <EmptyList
          //   image={emptyCart}
          //   // title="Make Order"
          //   message="Getting your order items ready in a moment..."
          //   // onPress={() => navigation.navigate('Explore')}
          // />
          itemOrders?.length === 0 || itemOrders?.length === undefined ? (
            <View
              style={{
                backgroundColor: colors.white,
                height: Dimensions.get('window').height,
              }}>
              <EmptyList
                image={emptyCart}
                // title="Make Order"
                message="oops, your order list is empty!"
                // onPress={() => navigation.navigate('Explore')}
              />
            </View>
          ) : (
            <Tab.Navigator
              tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: 'rgba(255, 255, 255, 0.5)',
                indicatorStyle: {
                  height: 6,
                  backgroundColor: '#fff',
                },
                labelStyle: {
                  fontSize: 12,
                  marginBottom: 0,
                  fontFamily: 'Muli-Bold',
                },
                tabStyle: {
                  paddingBottom: 0,
                  paddingTop: 0,
                  borderTopWidth: 0,
                  borderTopColor: '#fff',
                },
                style: {
                  borderTopWidth: 0,
                  borderTopColor: '#fff',
                  paddingBottom: 0,
                  paddingTop: 0,
                  backgroundColor: '#303030',
                },
              }}>
              {itemOrders !== undefined && (
                <Tab.Screen name="Current" component={Current} />
              )}
              {itemOrders !== undefined && (
                <Tab.Screen name="History" component={History} />
              )}
              {/* <Tab.Screen name="Upcoming" component={Upcoming} /> */}
            </Tab.Navigator>
          )}
        </View>
      </ScrollView>

      {/* <View style={StyleFoot.footer}>
        <Footer navigation={navigation} more={more} />
      </View> */}
    </>
  );
};

// function OrderStack({}) {
//   return (
//     <Stack.Navigator
//       initialRouteName={'Current'}
//       headerMode="screen"
//       screenOptions={{
//         headerTintColor: 'black',
//         headerStyle: {backgroundColor: 'white'},
//       }}>
//       <Stack.Screen
//         name="My Order"
//         component={OrderTab}
//         options={{
//           title: 'My Order',
//         }}
//       />
//     </Stack.Navigator>
//   );
// }
export {OrderDetails};
export default OrderTab;
