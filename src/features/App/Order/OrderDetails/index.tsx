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
        {count && <Text style={S.countStyle}>{`${count}x`}</Text>}
        <View style={{width: '70%', flexWrap: 'wrap'}}>
          <Text style={S.descriptionStyle}>{description}</Text>
          {unitPrice && (
            <PriceTag price={unitPrice} clear style={{width: '10%'}} />
          )}
        </View>
        {price && <PriceTag price={price} style={{width: '18%'}} clear />}
      </View>
    </>
  );
};

const OrderDetails = () => {
  const [value, setValue] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params?.itemDetails, 'consolledddFDetailssss=====');

  let item = route.params?.itemDetails;

  return (
    <View>
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
      {route.params?.basket !== 'basket' ? (
        <ScrollView>
          <View style={S.main}>
            <Total
              randomTitle="ORDER ID"
              randomValue={item?.itemData?.orderInfo?.orderId}
              mainStyle={S.totalHeaderStyle}
              randomTitleStyle={S.totalHeadertitle}
            />
            <Total
              randomTitle="STATUS"
              randomValue={item?.itemData?.orderInfo?.status}
              mainStyle={S.totalHeaderStyle}
              randomTitleStyle={S.totalHeadertitle}
              // randomStyle={{
              //   color:
              //     item.status == 'Cancelled'
              //       ? colors.red
              //       : item.status == 'Delivered'
              //       ? colors.primary
              //       : colors.black,
              // }}
            />
            <Total
              randomTitle="Requested at:"
              randomValue={new Date(
                item?.itemData?.orderInfo?.MenuPlanDetail?.createdAt,
              ).toLocaleDateString()}
              mainStyle={S.totalHeaderStyle}
            />
          </View>
          {/* <View style={S.main}> */}
          <OrderStack
            headerCount={item?.itemData?.orderInfo?.quantity}
            headerDescription={
              item?.itemData?.orderInfo?.MenuPlanDetail?.MenuItem?.itemName
            }
            headerPrice={item?.itemData?.orderInfo?.amount}
            // children={
            //   <UnitOrders
            //     price={1500}
            //     count={2}
            //     description="Banga soup and starch"
            //   />
            // }
            // style={{position: 'relative', bottom: -25, zIndex: 10}}
          />
          {/* </View> */}
          <View style={S.main}>
            <Total
              total={item?.itemData?.orderInfo?.amount}
              mainStyle={S.totalHeaderStyle}
            />
          </View>
          <OrderCard
            dateTitle="Collection Details"
            mainStyle={S.main}
            children={
              <>
                <Total
                  randomTitle="Collection"
                  randomValue={item?.itemData?.orderInfo?.deliveryOption}
                />
                <Total
                  randomTitle="Time of collection"
                  randomValue={item?.itemData?.orderInfo?.deliveryTime}
                />
                <Total
                  randomTitle="Location"
                  randomValue={item?.itemData?.orderInfo?.deliveryAddress}
                />
              </>
            }
          />
          <OrderCard
            dateTitle="Payment Details"
            mainStyle={S.main}
            children={
              <>
                <Total
                  randomTitle="style"
                  randomValue={item?.itemData?.orderInfo?.paymentType}
                />
                <Total
                  randomTitle="Method"
                  randomValue={item?.itemData?.orderInfo?.paymentMethod}
                />
                <Total
                  randomTitle="Location"
                  randomValue={item?.itemData?.orderInfo?.deliveryAddress}
                />
              </>
            }
          />
        </ScrollView>
      ) : (
        <ScrollView>
          <View style={S.main}>
            <Total
              randomTitle="ORDER ID"
              randomValue={item?.itemData?.id}
              mainStyle={S.totalHeaderStyle}
              randomTitleStyle={S.totalHeadertitle}
            />
            <Total
              randomTitle="STATUS"
              randomValue={item?.itemData?.status}
              mainStyle={S.totalHeaderStyle}
              randomTitleStyle={S.totalHeadertitle}
              // randomStyle={{
              //   color:
              //     item.status == 'Cancelled'
              //       ? colors.red
              //       : item.status == 'Delivered'
              //       ? colors.primary
              //       : colors.black,
              // }}
            />
            <Total
              randomTitle="Requested at:"
              randomValue={new Date(
                item?.itemData?.MenuPlan?.MenuplanDetail?.createdAt,
              ).toLocaleDateString()}
              mainStyle={S.totalHeaderStyle}
            />
          </View>
          {/* <View style={S.main}> */}
          <OrderStack
            headerCount={item?.itemData?.quantity}
            headerDescription={
              item?.itemData?.MenuPlan?.MenuplanDetail?.MenuItem?.itemName
            }
            headerPrice={item?.itemData?.amount}
            // children={
            //   <UnitOrders
            //     price={1500}
            //     count={2}
            //     description="Banga soup and starch"
            //   />
            // }
            // style={{position: 'relative', bottom: -25, zIndex: 10}}
          />
          {/* </View> */}
          <View style={S.main}>
            <Total
              total={item?.itemData?.amount}
              mainStyle={S.totalHeaderStyle}
            />
          </View>
          <OrderCard
            dateTitle="Collection Details"
            mainStyle={S.main}
            children={
              <>
                <Total
                  randomTitle="Collection"
                  randomValue={item?.itemData?.deliveryOption}
                />
                <Total
                  randomTitle="Time of collection"
                  randomValue={item?.itemData?.deliveryTime}
                />
                <Total
                  randomTitle="Location"
                  randomValue={item?.itemData?.deliveryAddress}
                />
              </>
            }
          />
          <OrderCard
            dateTitle="Payment Details"
            mainStyle={S.main}
            children={
              <>
                <Total
                  randomTitle="style"
                  randomValue={item?.itemData?.paymentType}
                />
                <Total
                  randomTitle="Method"
                  randomValue={item?.itemData?.paymentMethod}
                />
                <Total
                  randomTitle="Location"
                  randomValue={item?.itemData?.deliveryAddress}
                />
              </>
            }
          />

          {/* <View style={[S.main, {padding: 20}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <Text>Rate</Text>
            <Rating rating={1} />
          </View>
          <OmaCard
            title="Comment"
            titleStyle={{fontSize: 15}}
            otherProps={
              <BaseInput
                value={value}
                onChangeText={(text) => setValue(text)}
                multiline={true}
                numberOfLines={5}
                inputStyle={{textAlignVertical: 'top'}}
                style={{
                  borderRadius: 4,
                  borderColor: 'rgba(48, 48, 48, 0.85)',
                  borderWidth: 1,
                }}
              />
            }
          />
        </View> */}
        </ScrollView>
      )}
    </View>
  );
};

export default OrderDetails;
