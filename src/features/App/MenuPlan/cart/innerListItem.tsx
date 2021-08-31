import React, {useState} from 'react';
import {Image, Text, View, FlatList} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import MoreAction from '../../MyCart/MoreAction/index';
import {useNavigation} from '@react-navigation/native';
import PriceTag from '../../../../components/PriceTag/index';
import shortid from 'shortid';
import InnerList from './veryInnerList';

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
  plandiff: any;
  planName;
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
  plandiff,
  planName,
}: ListDataProps) => {
  console.log(planDetails, plantime, plandiff, '===planDetailsss===');

  //  const remapp = (Id) => {
  //    console.log('ASSIGN ID: ', assignmentId);
  //    const newObject = this.state.CourseId.map((item) => {
  //      return {
  //        Id: item.Id,
  //        instruction1: item.Instructions,
  //        Text: item.AssignmentinText,
  //        Url: item.URL,
  //        Semester: item.Semester,
  //        DateSet: item.DateSet,
  //        DueDate: item.DueDate,
  //        Assignment: item.Assignment,
  //        CourseName: item.CourseName,
  //        CourseCode: item.CourseCode,
  //      };
  //    });

  //    const {state, setParams, navigate} = this.props.navigation;
  //    const params = state.params || {};

  //    this.setState({modalVisible: false});

  //    const selectedAsignment = newObject.find((as) => as.Id === assignmentId);

  //    console.log(selectedAsignment, ':ASDDDDDDD');
  //    this.setState({assignment: selectedAsignment});
  //    console.log(this.state.assignment, ':ASSIGNMT');
  //  };

  //   const renderDelete = () => {
  //     return (
  //       <View>
  //         {/* <Text
  //             style={{
  //               fontSize: 20,
  //               color: 'rgba(48, 48, 48, 0.75)',
  //               paddingBottom: 10,
  //             }}>
  //             Scrambled eggs; Almond milk, Rare medium stir fry and Chicken.
  //           </Text> */}
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //           }}>
  //           {/* <MoreAction title="Edit Order" iconName="pen" /> */}
  //           {/* <MoreAction title="Add Quantity" iconName="signal" count /> */}
  //           <MoreAction
  //             cart={basketId}
  //             params={'deleteBasket'}
  //             title="Delete"
  //             iconName="trash"
  //             color="red"
  //             del
  //           />
  //         </View>
  //       </View>
  //     );
  // }

  const renderItem = ({item, index}) => {
    console.log(index, 'indexxxx====');
    return (
      <View>
        <View>
          <TouchableHighlight
            style={{zIndex: 200}}
            underlayColor=""
            key={item?.itemData?.id}
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
                    {<PriceTag price={format(item?.itemData?.amount)} clear />}
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
          </TouchableHighlight>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
            }}>
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
      </View>
    );
  };

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
            <FlatList
              data={item?.data}
              style={styles.listStyle}
              renderItem={({item, index}) => {
                return plandiff === 'plan' ? (
                  <View>
                    <InnerList
                      // plantime={planName}
                      // date={item?.deliveryDate}
                      // planDetails={item?.data}
                      styles={styles}
                      imageUrl={
                        item?.itemData?.orderInfo?.MenuPlanDetail?.MenuItem
                          ?.imageUrl
                      }
                      itemName={
                        item?.itemData?.orderInfo?.MenuPlanDetail?.MenuItem
                          ?.itemName
                      }
                      price={item?.itemData?.orderInfo?.amount}
                      delivery={item?.itemData?.orderInfo?.deliveryAddress}
                      count={item?.itemData?.orderInfo?.quantity}
                      time={item?.itemData?.orderInfo?.deliveryTime}
                      basketId={item?.itemData?.orderInfo?.basketid}
                    />
                  </View>
                ) : (
                  <InnerList
                    // plantime={item?.MenuPlan?.MenuplanDetail?.deliveryTime}
                    // date={item?.deliveryDate}
                    // planDetails={item?.data}
                    styles={styles}
                    imageUrl={
                      item?.itemData?.MenuPlan?.MenuplanDetail?.MenuItem
                        ?.imageUrl
                    }
                    itemName={
                      item?.itemData?.MenuPlan?.MenuplanDetail?.MenuItem
                        ?.itemName
                    }
                    price={item?.itemData?.amount}
                    delivery={item?.itemData?.deliveryAddress}
                    count={item?.itemData?.quantity}
                    time={item?.itemData?.deliveryTime}
                    basketId={item?.itemData?.basketid}
                  />
                );
              }}
              pagingEnabled
              keyExtractor={() => shortid.generate()}
            />
            {/* {toggle && (
              <View>
              
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <MoreAction title="Edit Order" iconName="pen" />
                  <MoreAction title="Add Quantity" iconName="signal" count />
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
            )} */}
          </View>
        );
      })}
    </View>
  );
};
