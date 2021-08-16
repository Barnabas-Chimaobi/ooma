import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import MoreAction from '../../MyCart/MoreAction/index';
import {useNavigation} from '@react-navigation/native';
import PriceTag from '../../../../components/PriceTag/index';

interface ListDataProps {
  styles: any;
  imageUrl: any;
  itemName: string;
  price: Number;
  delivery: string;
  count: Number;
  time: string;
  basketId: any;
  planDetails: any;
  date: any;
  plantime: any;
}

export const List = ({
  styles,
  imageUrl,
  itemName,
  price,
  delivery,
  count,
  time,
  basketId,
  planDetails,
  date,
  plantime,
}: ListDataProps) => {
  const [toggle, setToggle] = useState(false);
  const toggleView = () => {
    setToggle(!toggle);
    console.log('consoleedddd');
  };

  const format = (amount: Number) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  // console.log(
  //   planDetails?.map((item) => item?.plantype),
  //   '===planDetailsss===',
  // );

  console.log(planDetails, plantime, '===planDetailsss===');

  return (
    <View>
      <View style={{borderBottomWidth: 1}}>
        <Text style={{fontSize: 15, marginBottom: 5}}>
          {new Date(date).toString().substring(0, 15)}
        </Text>
      </View>
      {planDetails?.map((item: any) => {
        return (
          <View>
            <Text
              style={{
                marginRight: 10,
                fontWeight: 'bold',
                alignSelf: 'flex-end',
                marginBottom: 10,
              }}>
              {item?.planType}
            </Text>
            {item?.data?.map((item: any) => {
              return (
                <View>
                  <TouchableWithoutFeedback
                    key={item?.itemData?.MenuPlan?.id}
                    onPress={toggleView}>
                    <View style={styles.itemStyle}>
                      <Image
                        style={{height: 105, width: 105, borderRadius: 10}}
                        source={{
                          uri:
                            item?.itemData?.MenuPlan?.MenuplanDetail?.MenuItem
                              ?.imageUrl,
                        }}
                      />
                      <View style={{flexDirection: 'row', width: 180}}>
                        <View style={styles.textViewStyles}>
                          <Text style={styles.itemNameStyle}>
                            {
                              item?.itemData?.MenuPlan?.MenuplanDetail?.MenuItem
                                ?.itemName
                            }
                            <Text></Text>
                            <Text style={styles.countStyles}>
                              ({item?.itemData?.quantity}x)
                            </Text>
                          </Text>

                          {/* <Text style={styles.priceStyle}>{format(price)}</Text> */}
                          <Text style={styles.priceStyle}>
                            {
                              <PriceTag
                                price={format(item?.itemData?.amount)}
                                clear
                              />
                            }
                          </Text>

                          <Text style={styles.deliveryStyle}>
                            {item?.itemData?.deliveryAddress}
                          </Text>
                        </View>
                        <Text style={styles.timeStyle}>
                          {item?.itemData?.deliveryTime}
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                  {toggle && (
                    <View>
                      {/* <Text
            style={{
              fontSize: 20,
              color: 'rgba(48, 48, 48, 0.75)',
              paddingBottom: 10,
            }}>
            Scrambled eggs; Almond milk, Rare medium stir fry and Chicken.
          </Text> */}
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        {/* <MoreAction title="Edit Order" iconName="pen" /> */}
                        {/* <MoreAction title="Add Quantity" iconName="signal" count /> */}
                        <MoreAction
                          cart={basketId}
                          params={'deleteBasket'}
                          title="Delete"
                          iconName="trash"
                          color="red"
                          del
                        />
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};
