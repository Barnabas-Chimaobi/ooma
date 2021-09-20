import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import shortid from 'shortid';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

import AccordionListItem from '../../../../components/AccordionList/index';
import {RadioButton} from '../../../../components/RadioButton/index';
import ModalMessage from '../../../../components/CartMessagesModal';
import {List} from './innerListItem';
import {cartData} from './cartData';
import {styles} from './styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {ListItems} from './listItem';
import SimpleHeader from '../../../../components/HeaderBar/simpleHeader';
import PriceTag from '../../../../components/PriceTag/index';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {EmptyList} from '../../../../components';
import Modal from 'react-native-modal';
import {colors} from '../../../../colors';
import {useDispatch, useSelector} from 'react-redux';
import {basketStates} from '../../../../reducers/basket';
import {AppDispatch, RootState} from '../../../../store';
import {getMenuitemCart, getOrderById} from '../../../../FetchData';

const {width: windowWidth} = Dimensions.get('window');

interface ListItemDataProps {
  hour: string;
  list: {
    imageUrl: any;
    itemName: string;
    price: Number;
    time: string;
    delivery: string;
    count: number;
  }[];
}

export const Cart = () => {
  const basketItem = useSelector(
    (state: RootState) => state.basketState.payload,
  );
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const route = useRoute();
  const [date, setDate] = useState(new Date());
  const [, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [eachTime, setEachTime] = useState('');
  const [eachDate, setEachDate] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [orderName, setOrderName] = useState('');
  let [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [grouped, setgrouped] = useState([]);
  const [plantime, setPlantime] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [delivery, setDelivery] = useState('');

  const toggleVisible = () => setVisible((prevstate) => !prevstate);

  const gotoSubscribe = () => {
    if (orderName != '') {
      navigation.navigate('Checkout', {
        params: route?.params?.cartItems,
        subTotal: total,
        planOrderName: orderName,
        planOrder: 'planOrder',
        deliveryCharge: delivery,
      });
    }
    toggleVisible();
  };

  const groupBasketItem = () => {
    setRefreshing(true);
    let basketData: any = [];

    basketItem?.forEach((item: any) => {
      groupByDate(item, basketData);
    });
    basketData?.forEach((item: any) => {
      //replace the already exist data with the grouped plan data
      item['data'] = groupByPlanTypeDate(item?.data);
    });
    const total = basketItem?.map((item: any) => item.amount);
    let newsum = total?.reduce(
      (sum: any, current: any) => parseInt(sum) + parseInt(current),
    );
    setTotal(newsum);
    // console.log(newsum, 'newbasket======sss====');
    setgrouped(basketData);
    // console.log('====baket items======= ', JSON.stringify(basketData));
    setRefreshing(false);
    return basketData;
  };

  const getMenuplanKart = async () => {
    let basketData: any = [];
    const menuplanscart = await getOrderById(route?.params?.id);
    // setPlanCart(menuplanscart?.items);
    // dispatch(basketStates(menuplanscart?.data));

    menuplanscart?.data?.forEach((item: any) => {
      groupByDate1(item, basketData);
    });
    basketData?.forEach((item: any) => {
      //replace the already exist data with the grouped plan data
      item['data'] = groupByPlanTypeDate1(item?.data);
    });
    setgrouped(basketData);

    if (basketData !== undefined) {
      const all = basketData?.map((item: any) =>
        item?.data?.map((item: any) =>
          item?.data?.map((item: any) => item?.itemData?.orderInfo?.amount),
        ),
      );

      const total = menuplanscart?.data?.map(
        (item: any) => item?.orderInfo?.amount,
      );
      let newsum = total?.reduce(
        (sum: any, current: any) => parseInt(sum) + parseInt(current),
      );
      setTotal(newsum);
    }

    // console.log('====baket itemsssssssss======= ', JSON.stringify(basketData));
    setRefreshing(false);
    // console.log(menuplanscart?.data, '=======planscartttttttssssss=========');
    return basketData;
  };

  useEffect(() => {
    if (route?.params?.plan !== 'plan') {
      groupBasketItem();
      // console.log(basketItem, 'consolleedd========');
      if (basketItem !== undefined) {
        const all = basketItem?.map((item: any) => item.MenuPlan);
        const total = basketItem?.map((item: any) => item.amount);
        let newsum = total?.reduce(
          (sum: any, current: any) => parseInt(sum) + parseInt(current),
        );
        setTotal(newsum);
        const Charge = basketItem?.map((item: any) =>
          setDelivery(item?.deliveryCharge),
        );
        // console.log(total, '====newwwsummmtoatlllll');
        let all1 = all?.map((item: any) =>
          item?.MenuPlanDetails?.map(
            (item: any) => {
              setEachTime(item.plantype), setEachDate(item.plandate);
            },
            // console.log(item.plantype, item.plandate, '=======itemmmmssss====='),
            // {
            //   return {time: item.plantype, date: item.plandate};
            // },
          ),
        );
        setDateTime(all1);
      }
    } else {
      getMenuplanKart();
    }

    // onRefresh();
    // groupBasketItem();

    // console.log(all1, '=====all1======');
  }, [basketItem?.length]);

  const groupBy = (list: any, key: any) => {
    return list.reduce(function (rv: any, x: any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      // console.log(rv, '=====groupedrv=====');
      return rv;
    }, {});
  };

  let ttl = basketItem;

  const [isLiked, setIsLiked] = useState([
    {id: 1, value: true, name: 'QuickTeller', selected: false},
    {id: 2, value: false, name: 'Pay from My Wallet', selected: false},
  ]);
  const onRadioBtnClick = (item: any) => {
    let updatedState = isLiked?.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? {...isLikedItem, selected: true}
        : {...isLikedItem, selected: false},
    );
    setIsLiked(updatedState);
  };

  const onChange = (e: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((e) => e.itemName, []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth * 0.9,
        offset: index * windowWidth * 0.9,
      }),
      [],
    ),
  };

  const newData = cartData?.map((item, idx) => {
    item.date = moment(date).format('dddd, Do MMM YYYY');
    return {
      ...item,
    };
  });

  const groupByDate = (itemData: any, basketItems: any) => {
    for (const item of basketItems) {
      if (itemData?.deliveryDate == item?.deliveryDate) {
        item?.data?.push({
          planType: itemData?.MenuPlan?.MenuplanDetail?.plantype,
          itemData,
        });

        return;
      }
    }
    // if the basket item date doesnt exist before
    basketItems.push({
      deliveryDate: itemData?.deliveryDate,
      data: [
        {planType: itemData?.MenuPlan?.MenuplanDetail?.plantype, itemData},
      ],
    });
  };

  const groupByDate1 = (itemData: any, basketItems: any) => {
    for (const item of basketItems) {
      if (itemData?.orderInfo?.deliveryDate == item?.deliveryDate) {
        item.data.push({
          planType: itemData?.orderInfo?.MenuPlanDetail?.plantype,
          itemData,
        });

        return;
      }
    }
    // if the basket item date doesnt exist before
    basketItems.push({
      deliveryDate: itemData?.orderInfo?.deliveryDate,
      data: [
        {planType: itemData?.orderInfo?.MenuPlanDetail?.plantype, itemData},
      ],
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
          if (!planTypeArray?.includes(item.planType)) {
            planTypeData?.push({
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

  const groupByPlanTypeDate1 = (basketItems: any) => {
    let planTypeData: any = [];
    let planTypeArray: any = [];
    for (const item of basketItems) {
      // console.log(item, '=======itemmmm=====');
      if (planTypeData?.length == 0) {
        planTypeData?.push({
          planType: item?.planType,
          data: [{itemData: item?.itemData}],
        });
        planTypeArray.push(item?.planType);
      } else {
        for (const planData of planTypeData) {
          if (planData?.planType == item?.planType) {
            if (!checkIfPlanExist1(item, planData?.data)) {
              planData?.data?.push({itemData: item?.itemData});
            }
            break;
          }
          //Ensure that unique plantype exist
          if (!planTypeArray.includes(item?.planType)) {
            planTypeData?.push({
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

  const checkIfPlanExist1 = (item: any, plans: any) => {
    for (const plan of plans) {
      if (
        plan?.itemData?.MenuplanOrderDetailId ==
        item?.itemData?.MenuplanOrderDetailId
      ) {
        return true;
      }
    }
    return false;
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (route?.params?.plan !== 'plan') {
      groupBasketItem();
    } else {
      getMenuplanKart();
    }
  };

  const ListItem = ({hour, list}: ListItemDataProps) => {
    return (
      <View style={styles.listView}>
        <Text style={styles.hour}>{hour}</Text>
        <FlatList
          data={list}
          style={styles.listStyle}
          renderItem={({item}) => {
            return (
              <List
                styles={styles}
                imageUrl={item.imageUrl}
                itemName={item.itemName}
                price={item.price}
                delivery={item.delivery}
                count={item.count}
                time={item.time}
              />
            );
          }}
          pagingEnabled
          keyExtractor={() => shortid.generate()}
        />
      </View>
    );
  };

  let plan = 'plan';

  const getNewBasket = (item) => {
    // const total = item?.map((item: any) => item.amount);
    // let newsum = total?.reduce(
    //   (sum: any, current: any) => parseInt(sum) + parseInt(current),
    // );
    // setTotal(newsum);
    // console.log(item, 'newbasket======sss====');
  };

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={-305}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{flex: 1}}>
        <SimpleHeader style={{paddingLeft: 10}} />
        {route?.params?.plan === 'plan' ? (
          <Text
            style={{
              marginLeft: 10,
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              fontSize: 16,
            }}>
            {route?.params?.planName}
          </Text>
        ) : null}
        {refreshing !== true ? (
          <View style={styles.root}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {/* {grouped.length === 0 ? (
              <ActivityIndicator
                animating={refreshing}
                color={'green'}
                size={'large'}
              />
            ) : ( */}
              <FlatList
                data={grouped}
                style={styles.listStyle}
                renderItem={({item}) => {
                  // console.log(item, 'itemmm=====');
                  return (
                    <View>
                      {/* <List
                      plantime={item?.MenuPlan?.MenuplanDetail?.deliveryTime}
                      date={item?.MenuPlan?.MenuplanDetail?.plandate}
                      // planDetails={Object.values(item)}
                      styles={styles}
                      imageUrl={
                        item?.MenuPlan?.MenuplanDetail?.MenuItem?.imageUrl
                      }
                      itemName={item?.MenuPlan?.name}
                      price={item?.amount}
                      delivery={item?.deliveryAddress}
                      count={item?.quantity}
                      time={item?.MenuPlan?.MenuplanDetail?.plantype}
                      basketId={item?.id}
                    /> */}
                      {route?.params?.plan === 'plan' ? (
                        <List
                          plantime={item?.deliveryDate}
                          date={item?.deliveryDate}
                          planDetails={item?.data}
                          styles={styles}
                          plandiff={plan}
                          planName={route?.params?.planName}
                          allDetails={item?.data}
                          // imageUrl={
                          //   item?.MenuPlan?.MenuplanDetail?.MenuItem?.imageUrl
                          // }
                          // itemName={item?.MenuPlan?.name}
                          // price={item?.amount}
                          // delivery={item?.deliveryAddress}
                          // count={item?.quantity}
                          // time={item?.MenuPlan?.MenuplanDetail?.plantype}
                          // basketId={item?.id}
                        />
                      ) : basketItem?.length === undefined ? (
                        <EmptyList
                          image={require('../../../../assets/Images/emptyCart.png')}
                          title="FIND PLAN"
                          message="Oops! Your basket is empty"
                          onPress={() => navigation.goBack()}
                        />
                      ) : (
                        <List
                          newBasket={(item) => getNewBasket(item)}
                          plantime={
                            item?.MenuPlan?.MenuplanDetail?.deliveryTime
                          }
                          date={item?.deliveryDate}
                          planDetails={item?.data}
                          styles={styles}
                          allDetails={item?.data}
                          // imageUrl={
                          //   item?.MenuPlan?.MenuplanDetail?.MenuItem?.imageUrl
                          // }
                          // itemName={item?.MenuPlan?.name}
                          // price={item?.amount}
                          // delivery={item?.deliveryAddress}
                          // count={item?.quantity}
                          // time={item?.MenuPlan?.MenuplanDetail?.plantype}
                          // basketId={item?.id}
                        />
                      )}
                    </View>
                  );
                }}
                // pagingEnabled
                // nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                // {...flatListOptimizationProps}
                keyExtractor={() => shortid.generate()}
                ListEmptyComponent={
                  <EmptyList
                    image={require('../../../../assets/Images/emptyCart.png')}
                    title="FIND PLAN"
                    message="Oops! Your basket is still empty"
                    onPress={() => navigation.goBack()}
                  />
                }
              />
            </ScrollView>

            {/* <ListItems list={route?.params?.cartItems} styles={styles} /> */}
            {visible == true ? (
              <Modal
                style={{
                  // marginTop: '70%',
                  // marginBottom: '70%',
                  width: '100%',
                  alignSelf: 'center',
                }}
                isVisible={true}
                onBackdropPress={() => toggleVisible()}>
                <View
                  style={{
                    // flex: 1,
                    // width: 300,
                    height: 220,
                    backgroundColor: '#fff',
                  }}>
                  <View
                    style={{
                      // flexDirection: 'row',
                      marginVertical: 10,
                      // justifyContent: 'space-between',
                      // marginRight: 15,
                      backgroundColor: '#FFFFFF',
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        marginLeft: 15,
                        fontWeight: 'bold',
                        fontSize: 17,
                      }}>
                      Create a name for your new plan
                    </Text>
                    <TextInput
                      style={{
                        backgroundColor: 'rgba(196, 196, 196, 0.15);',
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 20,
                        borderRadius: 5,
                        padding: 5,
                        marginBottom: 10,
                      }}
                      value={orderName}
                      placeholder="Give your order a name"
                      onChangeText={(text) => setOrderName(text)}
                    />
                    <TouchableHighlight
                      underlayColor=""
                      onPress={() => gotoSubscribe()}>
                      <View
                        style={{
                          backgroundColor: colors.primary,
                          padding: 10,
                          width: '90%',
                          alignSelf: 'center',
                          borderRadius: 5,
                          marginTop: 20,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 16,
                            color: colors.white,
                          }}>
                          SAVE
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            ) : null}
            {basketItem?.length !== undefined || total !== undefined ? (
              <View style={styles.listFooter}>
                <View style={styles.total}>
                  <Text style={styles.totalText}>Total:</Text>
                  <Text style={styles.totalPrice}>{total} NGN</Text>
                </View>
                {route?.params?.plan === 'plan' ? null : (
                  <ModalMessage
                    onpress={() => toggleVisible()}
                    total={total}
                    cartParams={route?.params?.cartItems}
                    route="Cart"
                    openButtonTitle="PROCEED"
                    closeButtonTitle="SUBSCRIBE NOW"
                    otherCardViewStyle={styles.cardView}
                    btnClose={styles.btnClose}
                    otherModalViewStyle={styles.modalView}
                    btnStyles={styles.btnStyles}>
                    <View style={styles.radioSection}>
                      <Text style={styles.paymentText}>Payment Method</Text>
                      {isLiked?.map((item) => (
                        <RadioButton
                          onPress={() => onRadioBtnClick(item)}
                          selected={item.selected}
                          key={item?.id}>
                          {item?.name}
                        </RadioButton>
                      ))}
                    </View>
                    <View style={styles.priceSection}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontSize: 15}}>Sub Total</Text>
                        <Text style={{fontSize: 15}}>
                          {' '}
                          <PriceTag price={9500.0} clear />
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text>Delivery Charges</Text>
                        <Text>
                          <PriceTag price={500.0} clear />
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                          Total
                        </Text>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                          <PriceTag price={10000.0} clear />
                        </Text>
                      </View>
                    </View>
                  </ModalMessage>
                )}
              </View>
            ) : null}
          </View>
        ) : (
          <ActivityIndicator
            animating={refreshing}
            color={'green'}
            size={'large'}
          />
        )}
      </KeyboardAvoidingView>
    </>
  );
};
