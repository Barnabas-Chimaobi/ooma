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
  const navigation = useNavigation();
  const route = useRoute();
  const [date, setDate] = useState(new Date());
  const [, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [eachTime, setEachTime] = useState('');
  const [eachDate, setEachDate] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    const all = route?.params?.cartItems?.map((item: any) => item.MenuPlan);
    const total = route?.params?.cartItems?.map((item: any) => item.amount);
    let newsum = total?.reduce(
      (sum: any, current: any) => parseInt(sum) + parseInt(current),
    );
    setTotal(newsum);
    console.log(newsum, '====newwwsummmtoatlllll');
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
    // console.log(all1, '=====all1======');

    // console.log(route?.params?.cartItems, '====paramsssplannncarttt');
  }, []);

  const [isLiked, setIsLiked] = useState([
    {id: 1, value: true, name: 'QuickTeller', selected: false},
    {id: 2, value: false, name: 'Pay from My Wallet', selected: false},
  ]);
  const onRadioBtnClick = (item: any) => {
    let updatedState = isLiked.map((isLikedItem) =>
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

  const newData = cartData.map((item, idx) => {
    item.date = moment(date).format('dddd, Do MMM YYYY');
    return {
      ...item,
    };
  });

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

  return (
    <>
      <SimpleHeader style={{paddingLeft: 10}} />
      <View style={styles.root}>
        <FlatList
          data={dateTime}
          style={styles.listStyle}
          renderItem={({item}) => {
            return route?.params?.cartItems == undefined ? (
              <EmptyList
                image={require('../../../../assets/Images/emptyCart.png')}
                title="FIND PLAN"
                message="Oops! Your basket is still empty"
                onPress={() => navigation.goBack()}
              />
            ) : (
              <ListItems
                hour={eachTime}
                date={eachDate}
                list={route?.params?.cartItems}
                styles={styles}
              />
            );
          }}
          pagingEnabled
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
        {/* <ListItems list={route?.params?.cartItems} styles={styles} /> */}

        {total != '' ? (
          <View style={styles.listFooter}>
            <View style={styles.total}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalPrice}>{total} NGN</Text>
            </View>

            <ModalMessage
              route="Cart"
              openButtonTitle="SUBSCRIBE"
              closeButtonTitle="SUBSCRIBE NOW"
              otherCardViewStyle={styles.cardView}
              btnClose={styles.btnClose}
              otherModalViewStyle={styles.modalView}
              btnStyles={styles.btnStyles}>
              <View style={styles.radioSection}>
                <Text style={styles.paymentText}>Payment Method</Text>
                {isLiked.map((item) => (
                  <RadioButton
                    onPress={() => onRadioBtnClick(item)}
                    selected={item.selected}
                    key={item.id}>
                    {item.name}
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
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>Total</Text>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    <PriceTag price={10000.0} clear />
                  </Text>
                </View>
              </View>
            </ModalMessage>
          </View>
        ) : null}
      </View>
    </>
  );
};
