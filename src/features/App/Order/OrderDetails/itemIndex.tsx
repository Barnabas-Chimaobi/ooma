import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import S from './styles';
import {
  Total,
  PriceTag,
  OmaCard,
  Rating,
  BaseInput,
} from '../../../../components';
import OrderCard from '../components/OrderCard';
import {useNavigation, useRoute} from '@react-navigation/native';
import {colors} from '../../../../colors';
import {SimpleHeader, CheckBox1} from '../../../../components';

const OrderStack = ({
  headerPrice,
  headerCount,
  headerDescription,
  children,
  style,
  addons,
  total,
}: any) => {
  return (
    <>
      <UnitOrders
        price={headerPrice}
        count={headerCount}
        description={headerDescription}
        style={style}
        addons={addons}
      />
      {children}
    </>
  );
};

const UnitOrders = ({
  price,
  count,
  description,
  unitPrice,
  style,
  addons,
}: any) => {
  // let allAddons = JSON.parse(addons);
  // console.log(allAddons, 'addons======');
  let allAdds = JSON.parse(addons);
  let newadd = JSON.parse(allAdds);
  let attachAddons = newadd?.map((item) => (
    <View>
      {/* <Text style={S.countStyle}>{`${item?.quantity}x`}</Text>
          <View style={{width: '70%', flexWrap: 'wrap'}}> */}
      <Text style={{fontWeight: 'bold'}}>{item?.name},</Text>
      {/* <PriceTag price={item?.initialPrice} clear /> */}
      {/* </View> */}
      {/* <PriceTag price={item?.totalPrice} clear /> */}
    </View>
  ));
  return (
    <>
      <View style={[S.UnitOrdersmain, style]}>
        {count && <Text style={S.countStyle}>({`${count}x`})</Text>}
        <View style={{width: '70%', flexWrap: 'wrap'}}>
          <Text style={S.descriptionStyle}>
            {description}
            {/* {attachAddons} */}
          </Text>
          {unitPrice && <PriceTag price={unitPrice} clear />}
        </View>
        {price && (
          <PriceTag
            mainPrice={'mainprice'}
            price={Number(count) * Number(price)}
            clear
          />
        )}
      </View>
    </>
  );
};

const Adds = ({price, count, description, unitPrice, style, addons}: any) => {
  let allAdds = JSON.parse(addons);
  let newadd = JSON.parse(allAdds);
  // console.log(newadd, '====newwww===');
  return (
    <>
      {newadd?.map((item) => (
        <View style={[S.UnitOrdersmainadds, style]}>
          <Text style={S.countStyle}>({`${item?.quantity}x`})</Text>
          <View style={{width: '70%', flexWrap: 'wrap'}}>
            <Text style={S.AddonsdescriptionStyle}>{item?.name}</Text>
            <View style={{marginLeft: '-70%'}}>
              <PriceTag price={item?.initialPrice} clear />
            </View>
          </View>
          <PriceTag price={item?.totalPrice} clear />
        </View>
      ))}
    </>
  );
};

const OrderDetails = () => {
  const [value, setValue] = useState('');
  const [newAmount, setNewAmount] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  // console.log(route?.params, 'consolledddFDetailssss=====');

  let newlist = route?.params?.detail;
  // console.log(newlist, route?.params?.total, 'newlist========');
  useEffect(() => {
    let amount = route?.params?.total;
    setNewAmount(amount);
    console.log(newAmount, 'newamount=====');
  }, [0]);

  // let renderItem = ({item}) => {
  //   // console.log(newlist, 'individualllitemsssss========');
  //   return (
  //     // <ScrollView>
  //     <View>
  //       {item?.map((item) => {
  //         return item?.itemData?.menuitemorders?.MenuItemOrderDetails?.map(
  //           (item) => {
  //             // console.log(
  //             //   route?.params?.detail,
  //             //   'individualllitemsssss========',
  //             // );
  //             return (
  //               <View>
  //                 <View style={S.main}>
  //                   <Total
  //                     randomTitle="ORDER ID"
  //                     // value={item?.id}
  //                     randomValue={item?.id}
  //                     mainStyle={S.totalHeaderStyle}
  //                     randomTitleStyle={S.totalHeadertitle}
  //                   />
  //                   <Total
  //                     randomTitle="STATUS"
  //                     randomValue={item?.status}
  //                     mainStyle={S.totalHeaderStyle}
  //                     randomTitleStyle={S.totalHeadertitle}
  //                     // randomStyle={{
  //                     //   color:
  //                     //     item.status == 'Cancelled'
  //                     //       ? colors.red
  //                     //       : item.status == 'Delivered'
  //                     //       ? colors.primary
  //                     //       : colors.black,
  //                     // }}
  //                   />
  //                   <Total
  //                     randomTitle="Requested at:"
  //                     randomValue={item?.itemData?.menuitemorders?.deliveryTime}
  //                     mainStyle={S.totalHeaderStyle}
  //                   />
  //                 </View>
  //                 {/* <View style={S.main}> */}
  //                 <OrderStack
  //                   headerCount={item?.quantity}
  //                   headerDescription={
  //                     item?.itemData?.MenuPlan?.MenuplanDetail?.MenuItem
  //                       ?.itemName
  //                   }
  //                   headerPrice={item?.itemData?.menuitemorders?.amount}
  //                   children={<Adds />}
  //                   style={{position: 'relative', bottom: -25, zIndex: 10}}
  //                 />
  //                 {/* </View> */}
  //                 {/* <View style={S.main}>
  //                   <Total total={amount} mainStyle={S.totalHeaderStyle} />
  //                 </View> */}
  //                 <OrderCard
  //                   dateTitle="Collection Details"
  //                   mainStyle={S.main}
  //                   children={
  //                     <>
  //                       <Total
  //                         randomTitle="Collection"
  //                         randomValue={item?.itemData?.deliveryOption}
  //                       />
  //                       <Total
  //                         randomTitle="Time of collection"
  //                         randomValue={item?.itemData?.deliveryTime}
  //                       />
  //                       <Total
  //                         randomTitle="Location"
  //                         randomValue={item?.itemData?.deliveryAddress}
  //                       />
  //                     </>
  //                   }
  //                 />
  //                 <OrderCard
  //                   dateTitle="Payment Details"
  //                   mainStyle={S.main}
  //                   children={
  //                     <>
  //                       <Total
  //                         randomTitle="style"
  //                         randomValue={item?.itemData?.paymentType}
  //                       />
  //                       <Total
  //                         randomTitle="Method"
  //                         randomValue={item?.itemData?.paymentMethod}
  //                       />
  //                       <Total
  //                         randomTitle="Location"
  //                         randomValue={item?.itemData?.deliveryAddress}
  //                       />
  //                     </>
  //                   }
  //                 />
  //               </View>
  //             );
  //           },
  //         );
  //       })}
  //     </View>
  //     //  </ScrollView>
  //   );
  //   // });
  // };

  return (
    <View style={{marginBottom: 70}}>
      {/* <FlatList
        data={route?.params?.detail}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      /> */}
      <View
        style={{paddingLeft: 10, backgroundColor: colors.white, elevation: 10}}>
        <SimpleHeader />
      </View>
      <ScrollView>
        <View style={{backgroundColor: colors.white}}>
          <View style={S.main}>
            <Total
              randomTitle="ORDER ID"
              // value={newlist?.itemData?.id}
              randomValue={newlist?.itemData?.orderRef}
              mainStyle={S.totalHeaderStyle}
              randomTitleStyle={S.totalHeadertitle}
            />
            <Total
              randomTitle="STATUS"
              randomValue={newlist?.itemData?.menuitemorders?.status}
              mainStyle={S.totalHeaderStyle}
              randomTitleStyle={S.totalHeadertitle}
              randomStyle={{
                color: colors.start,
                // item.status == 'Cancelled'
                //   ? colors.red
                //   : item.status == 'Delivered'
                //   ? colors.primary
                //   : colors.black,
              }}
            />
            <Total
              randomTitle="Requested at:"
              randomValue={newlist?.itemData?.menuitemorders?.deliveryTime}
              mainStyle={S.totalHeaderStyle}
            />
          </View>
          <View
            style={{
              backgroundColor: colors.white,
              elevation: 10,
              marginBottom: 30,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 10,
              // width: '95%',
              // alignSelf: 'center',
            }}>
            <View style={S.main}>
              {newlist?.itemData?.menuitemorders?.MenuItemOrderDetails?.map(
                (item) => {
                  // console.log(item, 'itemsss=====');
                  let allAdds = JSON.parse(item?.Cart?.addons);
                  let newadd = JSON.parse(allAdds);
                  let mapped = newadd?.map((item) => {
                    return (
                      <UnitOrders
                        price={item?.totalPrice}
                        count={item?.quantity}
                        description={item?.name}
                        // addons={item?.Cart?.addons}
                        unitPrice={item?.price}
                      />
                    );
                  });
                  // console.log(mapped, 'typeffffff===========');
                  // console.log(
                  //   newadd?.map((item) => item.name),
                  //   'itemsssalllllll=====',
                  // );
                  return (
                    <View style={{marginTop: -40}}>
                      <OrderStack
                        headerCount={item?.Cart?.quantity}
                        headerDescription={item?.Cart?.MenuItem?.itemName}
                        headerPrice={item?.Cart?.MenuItem?.amount}
                        addons={item?.Cart?.addons}
                        children={
                          // <UnitOrders
                          //   price={item?.totalPrice}
                          //   count={item?.quantity}
                          //   description={item?.name}
                          //   // addons={item?.Cart?.addons}
                          //   unitPrice={item?.price}
                          // />
                          <Adds addons={item?.Cart?.addons} />
                        }
                        style={{position: 'relative', bottom: -25, zIndex: 10}}
                      />
                      {/* {allAdds?.map((item) => {
                      return (
                        <UnitOrders
                          price={item?.totalPrice}
                          count={item?.quantity}
                          description={item?.name}
                          // addons={item?.Cart?.addons}
                          unitPrice={item?.price}
                        />
                      );
                    })} */}
                    </View>
                  );
                },
              )}
            </View>
            <View style={{marginTop: 30}}>
              <View style={S.main}>
                <Total
                  total={Number(newAmount)}
                  mainStyle={S.totalHeaderStyle}
                  randomStyle={{marginLeft: 30}}
                />
              </View>
            </View>

            <OrderCard
              details={null}
              dateTitle="Delivery Details"
              // mainStyle={S.main}
              children={
                <>
                  <Total
                    randomTitle="Collection"
                    randomValue={
                      newlist?.itemData?.menuitemorders?.deliveryOption
                    }
                    randomStyle={{fontWeight: 'bold'}}
                    randomTitleStyle={{fontWeight: 'bold'}}
                  />
                  <Total
                    randomTitle="Time of collection"
                    randomValue={
                      newlist?.itemData?.menuitemorders?.deliveryTime
                    }
                    randomStyle={{width: '80%', fontWeight: 'bold'}}
                    randomTitleStyle={{fontWeight: 'bold'}}
                  />
                  <Total
                    randomTitle="Location"
                    randomValue={
                      newlist?.itemData?.menuitemorders?.deliveryAddress
                    }
                    randomStyle={{width: '80%', fontWeight: 'bold'}}
                    randomTitleStyle={{fontWeight: 'bold'}}
                  />
                </>
              }
            />
            <OrderCard
              details={null}
              dateTitle="Payment Details"
              // mainStyle={S.main}
              children={
                <>
                  <Total
                    randomTitle="Method"
                    randomValue={
                      newlist?.itemData?.menuitemorders?.paymentMethod
                    }
                    randomTitleStyle={{fontWeight: 'bold'}}
                    randomStyle={{fontWeight: 'bold'}}
                  />
                  <Total
                    randomTitle="Status"
                    randomValue={newlist?.itemData?.paymentStatus}
                    randomTitleStyle={{fontWeight: 'bold'}}
                    randomStyle={{fontWeight: 'bold'}}
                  />
                </>
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetails;
