import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import S from './styles';
import {
  Total,
  PriceTag,
  OmaCard,
  Rating,
  BaseInput,
} from '../../../../components';
import OrderCard from '../components/OrderCard';

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
        {price && <PriceTag price={price} style={{width: '15%'}} clear />}
      </View>
    </>
  );
};

const OrderDetails = () => {
  const [value, setValue] = useState('');
  return (
    <ScrollView>
      <View style={S.main}>
        <Total
          randomTitle="ORDER ID"
          randomValue="AX214088"
          mainStyle={S.totalHeaderStyle}
          randomTitleStyle={S.totalHeadertitle}
        />
        <Total
          randomTitle="STATUS"
          randomValue="Delivered"
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
          randomValue="8:09 AM"
          mainStyle={S.totalHeaderStyle}
        />
      </View>
      {/* <View style={S.main}> */}
      <OrderStack
        headerCount={2}
        headerDescription="Banga soup and starch,
Shrimps, snail,
 Dry fish and Yoghurt"
        headerPrice={1800}
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
        <Total total={6500} mainStyle={S.totalHeaderStyle} />
      </View>
      <OrderCard
        dateTitle="Collection Details"
        mainStyle={S.main}
        children={
          <>
            <Total randomTitle="Collection" randomValue="Doorstep" />
            <Total randomTitle="Time of collection" randomValue="9:22 AM" />
            <Total
              randomTitle="Location"
              randomValue="No. 290 Agbani road, Awknanaw, Enugu"
            />
          </>
        }
      />
      <OrderCard
        dateTitle="Payment Details"
        mainStyle={S.main}
        children={
          <>
            <Total randomTitle="style" randomValue="Pay on delivery" />
            <Total randomTitle="Method" randomValue="Cash" />
            <Total
              randomTitle="Location"
              randomValue="No. 290 Agbani road, Awknanaw, Enugu"
            />
          </>
        }
      />

      <View style={[S.main, {padding: 20}]}>
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
      </View>
    </ScrollView>
  );
};

export default OrderDetails;
