import React, {useState} from 'react';
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
import {DateFormatter} from '../../../../Utils';

const OrderStack = ({
  headerPrice,
  headerCount,
  headerDescription,
  children,
  style,
}: any) => {
  return (
    <>
      <UnitOrders
        price={headerPrice}
        count={headerCount}
        description={headerDescription}
        style={style}
      />
      {children}
    </>
  );
};

const UnitOrders = ({price, count, description, unitPrice, style}: any) => {
  return (
    <>
      <View style={[S.UnitOrdersmain, style]}>
        {count && <Text style={S.countStyle}>({`${count}x`})</Text>}
        <View style={{width: '70%', flexWrap: 'wrap'}}>
          <Text style={S.descriptionStyle}>{description}</Text>
          {unitPrice && <PriceTag price={Number(unitPrice)} clear style={{}} />}
        </View>
        {price && (
          <PriceTag
            mainPrice={'mainprice'}
            price={Number(price)}
            style={{}}
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
  console.log(addons, '====newwww===');
  return (
    <>
      {newadd?.map((item) => (
        <View style={[S.UnitOrdersmainadds, style]}>
          <Text style={S.countStyle}>({`${item?.quantity}x`})</Text>
          <View style={{width: '70%', flexWrap: 'wrap'}}>
            <Text style={S.AddonsdescriptionStyle}>{item?.name}</Text>
            <View style={{marginLeft: '-70%'}}>
              <PriceTag
                addsPrice={'price'}
                price={Number(item?.initialPrice)}
                clear
              />
            </View>
          </View>
          <PriceTag price={Number(item?.totalPrice)} clear />
        </View>
      ))}
    </>
  );
};

const OrderDetails = () => {
  const [value, setValue] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  // console.log(
  //   route.params?.itemDetails?.itemData?.orderInfo?.MenuPlanDetail?.plandate,
  //   'consolledddFDetailssss=====',
  // );

  let item = route.params?.itemDetails;

  return (
    <View style={{marginBottom: 50, backgroundColor: colors.white}}>
      {/* <FlatList
        data={route.params?.itemDetails}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItems}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      /> */}
      <View
        style={{paddingLeft: 10, backgroundColor: colors.white, elevation: 10}}>
        <SimpleHeader />
      </View>
      {route.params?.basket !== 'basket' ? (
        <ScrollView>
          <View style={S.main}>
            <Total
              randomTitle="ORDER ID"
              randomValue={item?.itemData?.orderInfo?.orderRef}
              mainStyle={S.totalHeaderStyle}
              randomTitleStyle={S.totalHeadertitle}
              randomStyle={{fontWeight: 'bold'}}
            />
            <Total
              randomTitle="STATUS"
              randomValue={item?.itemData?.orderInfo?.status}
              mainStyle={S.totalHeaderStyle}
              randomTitleStyle={S.totalHeadertitle}
              randomStyle={{
                color: colors.start,
              }}
            />

            <Total
              randomTitle="Requested at:"
              randomValue={new Date(
                item?.itemData?.orderInfo?.MenuPlanDetail?.plandate,
              ).toLocaleDateString()}
              // randomValue={DateFormatter.formatAMPM(
              //   item?.itemData?.orderInfo?.deliveryDate,
              // )}
              mainStyle={S.totalHeaderStyle}
              randomStyle={{fontWeight: 'bold'}}
            />
          </View>
          {/* <View style={S.main}> */}

          <View
            style={{
              backgroundColor: colors.white,
              elevation: 10,
              width: '95%',
              alignSelf: 'center',
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                elevation: 10,
                width: '95%',
                alignSelf: 'center',
                borderRadius: 10,
                top: 10,
              }}>
              <OrderStack
                headerCount={item?.itemData?.orderInfo?.quantity}
                headerDescription={
                  item?.itemData?.orderInfo?.MenuPlanDetail?.MenuItem?.itemName
                }
                headerPrice={
                  item?.itemData?.orderInfo?.MenuPlanDetail?.MenuItem?.amount
                }
                children={<Adds addons={item?.itemData?.orderInfo?.addons} />}
                // style={{position: 'relative', bottom: -25, zIndex: 10}}
              />
            </View>

            {/* </View> */}

            {Number(item?.itemData?.orderInfo?.deliveryCharge) !== 0 && (
              <View style={{marginTop: 20}}>
                <View style={S.main}>
                  <Total
                    totalTitle="delivery Charge"
                    orderTotal={Number(
                      item?.itemData?.orderInfo?.deliveryCharge,
                    )}
                    // total={Number(item?.itemData?.orderInfo?.amount)}
                    mainStyle={S.totalHeaderStyle}
                  />
                </View>
              </View>
            )}

            <View style={{marginTop: 20}}>
              <View style={S.main}>
                <Total
                  orderTotal={Number(item?.itemData?.orderInfo?.amount)}
                  // total={Number(item?.itemData?.orderInfo?.amount)}
                  mainStyle={S.totalHeaderStyle}
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
                    randomValue={item?.itemData?.orderInfo?.deliveryOption}
                    randomStyle={{fontWeight: 'bold'}}
                    randomTitleStyle={{fontWeight: 'bold'}}
                  />
                  <Total
                    randomTitle="Time of collection"
                    randomValue={item?.itemData?.orderInfo?.deliveryTime}
                    randomStyle={{width: '80%', fontWeight: 'bold'}}
                    randomTitleStyle={{fontWeight: 'bold'}}
                  />
                  <Total
                    randomTitle="Location"
                    randomValue={item?.itemData?.orderInfo?.deliveryAddress}
                    randomStyle={{fontWeight: 'bold'}}
                    randomTitleStyle={{fontWeight: 'bold'}}
                  />
                </>
              }
            />

            <View style={{}}>
              <OrderCard
                details={null}
                dateTitle="Payment Details"
                // mainStyle={S.main}
                children={
                  <>
                    {/* <Total
                    randomTitle="style"
                    randomValue={item?.itemData?.orderInfo?.paymentType}
                  /> */}
                    <Total
                      randomTitle="Method"
                      randomValue={item?.itemData?.orderInfo?.paymentMethod}
                      randomStyle={{fontWeight: 'bold'}}
                      randomTitleStyle={{fontWeight: 'bold'}}
                    />
                    <Total
                      randomTitle="Status"
                      randomValue={item?.itemData?.orderInfo?.paymentStatus}
                      randomStyle={{fontWeight: 'bold'}}
                      randomTitleStyle={{fontWeight: 'bold'}}
                    />
                  </>
                }
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          <View style={S.main}>
            <Total
              orderefId="id"
              randomTitle="ORDER ID"
              randomValue={item?.itemData?.id}
              randomStyle={{width: '90%', alignSelf: 'center', paddingRight: 5}}
              mainStyle={S.totalHeaderStyle}
              randomTitleStyle={S.totalHeadertitle}
            />
            <Total
              randomTitle="STATUS"
              randomValue={item?.itemData?.status}
              mainStyle={S.totalHeaderStyle}
              randomTitleStyle={S.totalHeadertitle}
              randomStyle={{
                color: colors.start,
              }}
            />
            <Total
              randomTitle="Requested at:"
              randomValue={new Date(
                item?.itemData?.MenuPlan?.MenuplanDetail?.plandate,
              ).toLocaleDateString()}
              // randomValue={DateFormatter.formatAMPM(
              //   item?.itemData?.MenuPlan?.MenuplanDetail?.plandate,
              // )}
              mainStyle={S.totalHeaderStyle}
            />
          </View>
          {/* <View style={S.main}> */}

          <View
            style={{
              backgroundColor: colors.white,
              elevation: 10,
              width: '95%',
              alignSelf: 'center',
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                elevation: 10,
                width: '95%',
                alignSelf: 'center',
                borderRadius: 10,
                top: 10,
              }}>
              <OrderStack
                headerCount={item?.itemData?.quantity}
                headerDescription={
                  item?.itemData?.MenuPlan?.MenuplanDetail?.MenuItem?.itemName
                }
                headerPrice={
                  item?.itemData?.MenuPlan?.MenuplanDetail?.MenuItem?.amount
                }
                children={<Adds addons={item?.itemData?.addons} />}
                // style={{position: 'relative', bottom: -25, zIndex: 10}}
              />
            </View>
            {/* </View> */}
            {Number(item?.itemData?.deliveryCharge) !== 0 && (
              <View style={{marginTop: 20}}>
                <View style={S.main}>
                  <Total
                    totalTitle="delivery Charge"
                    orderTotal={Number(item?.itemData?.deliveryCharge)}
                    // total={Number(item?.itemData?.orderInfo?.amount)}
                    mainStyle={S.totalHeaderStyle}
                  />
                </View>
              </View>
            )}

            <View style={{marginTop: 20}}>
              <View style={S.main}>
                <Total
                  total={Number(item?.itemData?.amount)}
                  mainStyle={S.totalHeaderStyle}
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
                    randomValue={item?.itemData?.deliveryOption}
                    randomStyle={{fontWeight: 'bold'}}
                    randomTitleStyle={{fontWeight: 'bold'}}
                  />
                  <Total
                    randomTitle="Time of collection"
                    randomValue={item?.itemData?.deliveryTime}
                    randomStyle={{width: '80%', fontWeight: 'bold'}}
                    randomTitleStyle={{fontWeight: 'bold'}}
                  />
                  <Total
                    randomTitle="Location"
                    randomValue={item?.itemData?.deliveryAddress}
                    randomStyle={{fontWeight: 'bold'}}
                    randomTitleStyle={{fontWeight: 'bold'}}
                  />
                </>
              }
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default OrderDetails;
