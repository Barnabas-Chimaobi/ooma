import React, {useCallback, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  RefreshControl,
} from 'react-native';

import shortid from 'shortid';
import {myPlanData} from './myPlanData';
import {ProgressBar} from '../../../../../components/ProgressBar/index';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {BottomSheet} from '../../../../../components/BottomSheetModal';
import {BottomSheetList} from './bottomSheetList';
import {getMenuPlanOrders} from '../../../../../FetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button,
  ButtonType,
  PriceTag,
  EmptyList,
} from '../../../../../components';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {BallIndicator} from 'react-native-indicators';

const {width: windowWidth} = Dimensions.get('window');

interface ListItemProps {
  location: string;
  icon: any;
  list?: {
    imageUrl: any;
    itemName: string;
    pecentage: Number;
    time: string;
    status: string;
    time1: any;
  };
}
interface ListProps {
  imageUrl: any;
  itemName: string;
  pecentage: Number;
  time: string;
  status: string;
  time1: any;
  planId: any;
}

interface Props {
  findPlan: (newValue: Number) => void;
}

export const MyPlans = ({findPlan}: Props) => {
  const navigation = useNavigation();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [planOrders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);
  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

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

  // const getOrders = async () => {
  //   const userId = await AsyncStorage.getItem('userId');
  //   console.log(userId, 'useriddd');
  //   // const gottenId = JSON.parse(userId);

  //   try {
  //     // console.log(newsum, 'cartttttt');
  //     const order = await getMenuPlanOrders(userId);

  //     groupBasketItem()
  //     // setOrders(order?.items);
  //     //  await dispatch(cartStates(menuICart?.items));
  //     console.log(order, 'cart ===value');
  //     console.log(
  //       order?.items?.map((item: any) => item),
  //       'cart ===valuesssss',
  //     );

  //     // setRefreshing(false);
  //   } catch (error) {
  //     console.log(error, '====errorrsss====');
  //     // setRefreshing(false);
  //   }
  // };

  const groupBasketItem = async (item: any) => {
    let basketData: any = [];

    const userId = await AsyncStorage.getItem('userId');
    console.log(userId, 'useriddd');
    // const gottenId = JSON.parse(userId);
    setLoader(true);
    try {
      // console.log(newsum, 'cartttttt');
      const order = await getMenuPlanOrders(userId);

      console.log(order?.items, 'orderItemsss=======');

      order?.items?.forEach((item: any) => {
        console.log(item);
        groupByDate(item, basketData);
      });

      basketData.forEach((item: any) => {
        //replace the already exist data with the grouped plan data
        item['data'] = groupByPlanTypeDate(item.data);
      });

      setOrders(basketData);
      console.log('====baket items======= ', JSON.stringify(basketData));
      // setOrders(order?.items);
      //  await dispatch(cartStates(menuICart?.items));
      setLoader(false);
      return item;

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
          console.log('======hello world=====', planData);
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
    console.log(basketItems, '=====panadetailsss=====');
    for (const item of basketItems) {
      console.log(item, '=====itemsssssss');
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
      planStart: itemData.orderInfo.MenuPlan.startDate,
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

  // const groupByDate = (orderInfo: any, basketItems: any) => {
  //   console.log(orderInfo, 'orderinfoconsoled====');
  //   console.log(basketItems, 'orderinfoconsoled====');

  //   for (const item of basketItems) {
  //     if (orderInfo.orderName == item.orderName) {
  //       item.data.push({
  //         PlanType: orderInfo.MenuPlanDetail.plantype,
  //         orderInfo,
  //       });

  //       return;
  //     }
  //   }
  //   // if the basket item date doesnt exist before
  //   basketItems.push({
  //     deliveryDate: orderInfo.orderName,
  //     data: [{PlanType: orderInfo.MenuPlanDetail.plantype, orderInfo}],
  //   });
  // };

  useEffect(() => {
    groupBasketItem();
  }, []);

  const Item = ({
    imageUrl,
    itemName,
    pecentage,
    time,
    status,
    time1,
    planId,
  }: ListProps) => {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('Cart', {
            id: planId,
            plan: 'plan',
            planName: itemName,
          })
        }
        style={styles.innerListItemStyle}>
        <Image
          style={{height: 100, width: 100, borderRadius: 10}}
          source={{uri: imageUrl}}
        />
        <View style={styles.itemTextArea}>
          <Text style={styles.itemNameStyle}>{itemName}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.timeStyle}>
              {new Date(time).toDateString()} -
            </Text>
            <Text> </Text>
            <Text style={styles.timeStyle}>
              {new Date(time1).toDateString()}
            </Text>
          </View>
          <View>
            <Text style={styles.statusStyle}>{status}</Text>
            <ProgressBar progressValue={pecentage} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const Header = ({icon, location}: ListItemProps) => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.locationStyle}>{location}</Text>
        <Image source={icon} />
      </View>
    );
  };

  const ListItem = ({location, icon, list}: ListItemProps) => {
    return (
      <View style={styles.main}>
        <FlatList
          data={planOrders}
          style={styles.innerListStyle}
          renderItem={({item}) => {
            return (
              <Item
                imageUrl={item?.planImage}
                itemName={item?.planName}
                pecentage={item.pecentage}
                time={item.planStart}
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
          // ListHeaderComponent={<Header icon={icon} location={location} />}
        />
      </View>
    );
  };

  // myPlanData.length = 0;

  return (
    <>
      <View style={{flex: 1, marginBottom: 30}}>
        <RefreshControl refreshing={loader} />
        {/* <Spinner
        visible={loader}
        // textStyle={styles.spinnerTextStyle}
        overlayColor="rgba(66, 66, 66,0.6)"
        customIndicator={<BallIndicator color="white" />}
      /> */}
        {/* {planOrders?.length !== 0 ? ( */}
        <>
          {/* <FlatList
            data={myPlanData || []}
            style={styles.listStyle}
            renderItem={({item}) => {
              return ( */}
          <ListItem
          // icon={item.icon}
          // location={item.location}
          // list={item.list}
          />
          {/* );
            }}
            {...flatListOptimizationProps}
          /> */}
          <BottomSheet
            isOpen={isOpen}
            openedPercentage={0.7}
            onClose={closeDrawer}>
            <View style={styles.buttonContainer}>
              <BottomSheetList onSubmit={closeDrawer} />
            </View>
          </BottomSheet>
        </>
        {/* ) : (
        <View style={styles.noData}>
          <Image
            style={{marginTop: 20}}
            source={require('../../assets/no-data.png')}
          />
          <Text style={styles.btnText}>
            You do not have any ongoing meal plan.
          </Text>
          <TouchableWithoutFeedback onPress={() => findPlan(0)}>
            <View style={styles.btn}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                FIND PLANS
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )} */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {marginBottom: 220, paddingBottom: 20},
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    padding: 10,
  },
  locationStyle: {
    fontStyle: 'italic',
    opacity: 0.5,
  },
  main: {
    marginBottom: 200,
    flex: 1,
  },
  innerListItemStyle: {
    borderBottomColor: '#44444475',
    borderBottomWidth: 1,
    padding: 10,
    flexDirection: 'row',
  },
  listStyle: {flex: 1, marginBottom: 220, paddingBottom: 50},

  innerListStyle: {},
  itemTextArea: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  itemNameStyle: {fontWeight: 'bold', fontSize: 16},
  timeStyle: {opacity: 0.5, fontSize: 12},
  statusStyle: {color: 'green'},
  pecentageStyle: {fontSize: 10, fontWeight: 'bold'},
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  btn: {
    height: 40,
    width: 150,
    backgroundColor: '#303030',
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 15,
    marginTop: 10,
    letterSpacing: 1,
  },
  noData: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
