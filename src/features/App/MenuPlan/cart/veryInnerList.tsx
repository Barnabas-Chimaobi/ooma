import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableHighlight, Dimensions} from 'react-native';
import PriceTag from '../../../../components/PriceTag/index';
import shortid from 'shortid';
import MoreAction from '../../MyCart/MoreAction/index';
import basket from '../../../../reducers/basket';
import {useNavigation, useRoute} from '@react-navigation/native';
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
  details: any;
  diffParams: any;
  option: any;
  showDelete: any;
  getNewbasket: () => void;
}

const VeryInnerList = ({
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
  details,
  diffParams,
  option,
  showDelete,
  getNewbasket,
}: ListDataProps) => {
  const navigation = useNavigation();
  const [toggle, setToggle] = useState(false);
  const toggleView = () => {
    setToggle(!toggle);
    // console.log(option, '=========consoleedddd');
  };

  const format = (amount: Number) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };
  // console.log(option, '=========consoleedddd');

  return (
    <View>
      <View>
        <Text>{}</Text>
        <TouchableHighlight
          style={{zIndex: 200}}
          underlayColor=""
          // key={item?.itemData?.id}
          onPress={() =>
            diffParams
              ? toggleView()
              : navigation.navigate('OrderDetails', {
                  itemDetails: details,
                })
          }>
          <View style={styles.itemStyle}>
            <Image
              style={{
                height: Dimensions.get('window').height / 6.8,
                width: Dimensions.get('window').width / 3.4,
                borderRadius: 10,
              }}
              source={{
                uri: imageUrl,
              }}
            />
            <View style={{flexDirection: 'row', width: 180}}>
              <View style={styles.textViewStyles}>
                <Text style={styles.itemNameStyle}>
                  {itemName}
                  <Text></Text>
                  <Text style={styles.countStyles}>({count}x)</Text>
                </Text>

                {/* <Text style={styles.priceStyle}>{format(price)}</Text> */}
                <Text style={styles.priceStyle}>
                  {<PriceTag price={format(price)} clear />}
                </Text>

                <Text style={styles.deliveryStyle}>{delivery}</Text>
                <Text style={styles.deliveryStyle}>{option}</Text>
              </View>
              <Text style={styles.timeStyle}>{time}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>

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
            {!showDelete && (
              <MoreAction
                basket={diffParams}
                details={details}
                params={'details'}
                title="View Details"
              />
            )}

            {!showDelete && (
              <MoreAction
                gottenNewCart={(item) => getNewbasket(item)}
                cart={basketId}
                params={'deleteBasket'}
                title="Delete"
                iconName="trash"
                color="red"
                del
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default VeryInnerList;
