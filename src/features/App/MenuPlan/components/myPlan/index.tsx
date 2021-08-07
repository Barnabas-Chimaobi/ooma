import React, {useCallback, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
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
  }[];
}
interface ListProps {
  imageUrl: any;
  itemName: string;
  pecentage: Number;
  time: string;
  status: string;
  time1: any;
}

interface Props {
  findPlan: (newValue: Number) => void;
}

export const MyPlans = ({findPlan}: Props) => {
  const navigation = useNavigation();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [planOrders, setOrders] = useState([]);
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

  const getOrders = async () => {
    const userId = await AsyncStorage.getItem('userId');
    console.log(userId, 'useriddd');
    // const gottenId = JSON.parse(userId);

    try {
      // console.log(newsum, 'cartttttt');
      const order = await getMenuPlanOrders(userId);
      setOrders(order?.items);
      //  await dispatch(cartStates(menuICart?.items));
      console.log(order, 'cart ===value');
      console.log(
        order?.items?.map((item: any) => item),
        'cart ===valuesssss',
      );

      // setRefreshing(false);
    } catch (error) {
      console.log(error, '====errorrsss====');
      // setRefreshing(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const Item = ({
    imageUrl,
    itemName,
    pecentage,
    time,
    status,
    time1,
  }: ListProps) => {
    return (
      <TouchableWithoutFeedback
        onPress={openDrawer}
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
                imageUrl={item?.orderInfo?.MenuPlan?.imageurl}
                itemName={item?.orderInfo?.orderName}
                pecentage={item.pecentage}
                time={item?.orderInfo?.MenuPlan?.startDate}
                status={item?.orderInfo?.status}
                time1={item?.orderInfo?.MenuPlan?.endDate}
              />
            );
          }}
          {...flatListOptimizationProps}
          ListEmptyComponent={
            <EmptyList
              image={require('../../../../../assets/Images/emptyCart.png')}
              title="FIND MEAL"
              message="Oops! You don't have any ongoing plan"
              onPress={() => navigation.goBack()}
            />
          }
          ListHeaderComponent={<Header icon={icon} location={location} />}
        />
      </View>
    );
  };

  // myPlanData.length = 0;

  return (
    <>
      {planOrders?.length !== 0 ? (
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
      ) : (
        <View style={styles.noData}>
          <Image
            style={{marginTop: 20}}
            source={require('../../assets/no-data.png')}
          />
          <Text style={styles.btnText}>
            You do not have any ongoing menu plan.
          </Text>
          <TouchableWithoutFeedback onPress={() => findPlan(0)}>
            <View style={styles.btn}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                FIND PLANS
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
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
    marginBottom: 20,
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
