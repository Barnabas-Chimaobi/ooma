import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import shortid from 'shortid';
import {menuHistoryData} from './menuHistoryData';
import {ProgressBar} from '../../../../../components/ProgressBar/index';
import {PopupMenu} from '../../../../../components/PopupMenu/index';
import {Alert} from 'react-native';
import {getMenuPlanOrders} from '../../../../../FetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button,
  ButtonType,
  PriceTag,
  EmptyList,
  SimpleHeader,
} from '../../../../../components';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {BallIndicator} from 'react-native-indicators';
const {width: windowWidth} = Dimensions.get('window');
import {colors} from '../../../../../colors';

interface ListProps {
  imageUrl: any;
  itemName: string;
  pecentage: Number;
  time: string;
  status: string;
  list: any;
  time1: any;
  planId: any;
}

export const MenuHistory = () => {
  const navigation = useNavigation();
  const [planOrders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);

  const flatListOptimizationProps = {
    // initialNumToRender: 0,
    // maxToRenderPerBatch: 1,
    // removeClippedSubviews: true,
    // scrollEventThrottle: 16,
    // windowSize: 2,
    keyExtractor: () => shortid.generate(),
    // getItemLayout: useCallback(
    //   (_, index) => ({
    //     index,
    //     length: windowWidth * 0.9,
    //     offset: index * windowWidth * 0.9,
    //   }),
    //   [],
    // ),
  };

  const getOrders = async () => {
    setLoader(true);
    let basketData: any = [];

    const userId = await AsyncStorage.getItem('userId');
    console.log(userId, 'useriddd');
    // const gottenId = JSON.parse(userId);

    try {
      // console.log(newsum, 'cartttttt');
      const order = await getMenuPlanOrders(userId);
      // setOrders(order?.items);
      //  await dispatch(cartStates(menuICart?.items));
      // console.log(order, 'cart ===value');
      // console.log(
      //   order?.items?.map((item: any) => item),
      //   'cart ===valuesssss',
      // );

      order?.items?.forEach((item: any) => {
        // console.log(item);
        groupByDate(item, basketData);
      });

      basketData.forEach((item: any) => {
        //replace the already exist data with the grouped plan data
        item['data'] = groupByPlanTypeDate(item.data);
      });
      setOrders(basketData);
      setLoader(false);
      // console.log('====baket items======= ', JSON.stringify(basketData));
      // setOrders(order?.items);
      //  await dispatch(cartStates(menuICart?.items));
      //  return item;

      // setRefreshing(false);
    } catch (error) {
      console.log(error, '====errorrsss====');
      // setRefreshing(false);
    }
  };

  const groupByPlanTypeDate = (basketItems: any) => {
    let planTypeData: any = [];
    for (const item of basketItems) {
      if (planTypeData.length == 0) {
        planTypeData.push({
          planType: item.planType,
          data: [{itemData: item.itemData}],
        });
      } else {
        for (const planData of planTypeData) {
          // console.log('======hello world=====', planData);
          if (planData.planType == item.planType) {
            if (!checkIfPlanExist(item, planData.data)) {
              planData.data.push({itemData: item.itemData});
            }
            break;
          } else {
            planTypeData.push({
              planType: item.planType,
              data: [{itemData: item.itemData}],
            });
          }
        }
      }
    }
    return planTypeData;
  };

  const checkIfPlanExist = (item: any, plans: any) => {
    for (const plan of plans) {
      if (plan.itemData.id == item?.itemData?.id) {
        return true;
      }
    }
    return false;
  };

  const groupByDate = (itemData: any, basketItems: any) => {
    // console.log(basketItems, '=====panadetailsss=====');
    for (const item of basketItems) {
      // console.log(item, '=====itemsssssss');
      if (itemData.orderInfo.orderName == item.planName) {
        item.data.push({
          planType: itemData.orderInfo.orderName,
          itemData,
        });

        return;
      }
    }
    // if the basket item date doesnt exist before
    basketItems.push({
      planName: itemData.orderInfo.orderName,
      plantotal: itemData.orderInfo.total,
      planImage: itemData.orderInfo.MenuPlan.imageurl,
      planStart: itemData.orderInfo.deliveryDate,
      planEnd: itemData.orderInfo.MenuPlan.endDate,
      planStatus: itemData.orderInfo.status,
      planId: itemData.orderInfo.orderId,
      data: [
        {
          planType: itemData.orderInfo.orderName,
          itemData,
        },
      ],
    });
  };
  useEffect(() => {
    getOrders();
  }, []);

  const onPopupEvent = (eventName: string, index: Number) => {
    if (eventName !== 'itemSelected') return;
    if (index === 0) Alert.alert('Full Details');
    else Alert.alert('Deleted');
  };

  const Item = ({
    imageUrl,
    itemName,
    pecentage,
    time,
    status,
    list,
    time1,
    planId,
  }: ListProps) => {
    // console.log(
    //   list?.map((item: any) => item),
    //   '===listitemmsss===',
    // );
    return status === 'Delivered' ||
      status === 'Ready' ||
      status === 'Cancelled' ? (
      <View
        style={{
          elevation: 10,
          width: '96%',
          backgroundColor: colors.white,
          borderRadius: 10,
          marginBottom: 15,
          alignSelf: 'center',
          marginTop: 10,
        }}>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('Cart', {
              id: planId,
              plan: 'plan',
              planName: itemName,
            })
          }
          style={styles.innerListItemStyle}>
          <View style={styles.innerListItemStyle}>
            <View style={styles.overlayStyle} />
            <Image
              style={{height: 100, width: 100, borderRadius: 10}}
              source={{uri: imageUrl}}
            />
            <View style={styles.itemTextArea}>
              <Text style={styles.itemNameStyle}>{itemName}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.timeStyle}>
                  {new Date(time).toDateString()}
                </Text>
                {/* <Text> </Text>
              <Text style={styles.timeStyle}>
                {new Date(time1).toDateString()}
              </Text> */}
              </View>
              <View>
                <Text style={styles.statusStyle}>{status}</Text>
                {/* <ProgressBar progressValue={pecentage} /> */}
              </View>
            </View>
            {/* <View style={{marginLeft: 'auto', zIndex: 555, top: 10}}>
            <PopupMenu
              actions={['View Full Details', 'Delete']}
              onPressMenu={onPopupEvent}
            />
          </View> */}
          </View>
        </TouchableWithoutFeedback>
      </View>
    ) : null;
  };

  return (
    <View>
      <View style={{marginLeft: 10}}>
        <SimpleHeader />
      </View>
      <Spinner
        visible={loader}
        textContent={'Getting your order history ready..'}
        textStyle={{fontSize: 16, fontFamily: 'Montserrat', fontWeight: '900'}}
        overlayColor="rgba(66, 66, 66,0.6)"
        customIndicator={<BallIndicator color="white" />}
      />
      {planOrders?.map((item) =>
        item?.planStatus.includes('Delivered' || 'Ready' || 'Cancelled'),
      ) ? (
        <FlatList
          data={planOrders}
          style={styles.listStyle}
          renderItem={({item}) => {
            return (
              <Item
                imageUrl={item?.planImage}
                itemName={item?.planName}
                pecentage={item.pecentage}
                time={item?.planStart}
                status={item?.planStatus}
                time1={item?.planEnd}
                planId={item?.planId}
              />
            );
          }}
          {...flatListOptimizationProps}
          // ListEmptyComponent={
          //   <EmptyList
          //     image={require('../../../../../assets/Images/emptyCart.png')}
          //     title="FIND MEAL"
          //     message="Oops! You don't have any ongoing plan"
          //     onPress={() => navigation.goBack()}
          //   />
          // }
        />
      ) : (
        <EmptyList
          image={require('../../../../../assets/Images/emptyCart.png')}
          // title="FIND MEAL"
          message="Oops! You don't have any completed plan"
          // onPress={() => navigation.goBack()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  locationStyle: {
    fontStyle: 'italic',
    opacity: 0.5,
  },
  overlayStyle: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    right: 10,
    zIndex: 5,
    opacity: 0.4,
  },
  innerListItemStyle: {
    borderBottomColor: '#44444475',
    // borderBottomWidth: 1,
    padding: 4,
    flexDirection: 'row',
  },
  listStyle: {},

  innerListStyle: {},
  itemTextArea: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  itemNameStyle: {fontWeight: 'bold', fontSize: 16},
  timeStyle: {opacity: 0.5, fontSize: 12},
  statusStyle: {color: colors.green},
  pecentageStyle: {fontSize: 10, fontWeight: 'bold'},
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
