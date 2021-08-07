import React from 'react';
import {View, FlatList} from 'react-native';
import {SortBy, OrderCard} from '../components';
import {Total, EmptyList} from '../../../../components';
import shortid from 'shortid';
import S from './styles';
import {emptyCart} from '../../../../assets';
import {colors} from '../../../../colors';

const RenderItems = ({item}: any) => {
  console.log(item?.menuitemorders?.MenuItemOrderDetails, 'item');
  return (
    <OrderCard
      dateTitle={item?.menuitemorders?.deliveryTime}
      titlePosition="right"
      children={
        <>
          <Total
            randomTitle="ORDER ID"
            randomValue={item?.id}
            mainStyle={S.totalStyle}
          />
          <Total
            randomTitle="ITEM"
            randomValue={item?.id}
            mainStyle={S.totalStyle}
          />
          <Total
            total={Number(item?.menuitemorders?.total)}
            totalTitle="PRICE"
            mainStyle={S.totalStyle}
          />
          <Total
            randomTitle="STATUS"
            randomValue={item?.paymentStatus}
            mainStyle={S.totalStyle}
            randomStyle={{
              color:
                item?.paymentStatus == 'Cancelled'
                  ? colors.red
                  : item?.paymentStatus == 'NOT-PAID'
                  ? colors.primary
                  : colors.black,
            }}
          />
        </>
      }
    />
  );
};

const Current = ({item}) => {
  console.log(item, 'consoleditemmm======');
  const data: any = [
    {
      orderId: 'ZS214298',
      time: '5',
      status: 'Delivered',
      price: '4000',
    },
  ];

  return (
    <View style={S.main}>
      <FlatList
        ListHeaderComponent={<>{item.length > 0 && <SortBy />}</>}
        renderItem={({item}) => <RenderItems item={item} />}
        data={item}
        keyExtractor={() => shortid.generate()}
        ListEmptyComponent={
          <EmptyList
            image={emptyCart}
            title="Make Order"
            message="Oops! Your order is empty"
            // onPress={() => navigation.navigate('Explore')}
          />
        }
      />
    </View>
  );
};

export default Current;
