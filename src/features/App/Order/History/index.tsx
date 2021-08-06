import React from 'react';
import {View, FlatList} from 'react-native';
import {SortBy, OrderCard} from '../components';
import {Total, EmptyList} from '../../../../components';
import shortid from 'shortid';
import S from './styles';
import {emptyCart} from '../../../../assets';
import {colors} from '../../../../colors';

const RenderItems = ({item}: any) => {
  console.log(item.status, 'item');
  return (
    <OrderCard
      dateTitle="24/9/2021"
      titlePosition="right"
      children={
        <>
          <Total
            randomTitle="ORDER ID"
            randomValue={item.orderId}
            mainStyle={S.totalStyle}
          />
          <Total
            randomTitle="ITEM"
            randomValue={item.time}
            mainStyle={S.totalStyle}
          />
          <Total
            total={Number(item.price)}
            totalTitle="PRICE"
            mainStyle={S.totalStyle}
          />
          <Total
            randomTitle="STATUS"
            randomValue={item.status}
            mainStyle={S.totalStyle}
            randomStyle={{
              color:
                item.status == 'Cancelled'
                  ? colors.red
                  : item.status == 'Delivered'
                  ? colors.primary
                  : colors.black,
            }}
          />
        </>
      }
    />
  );
};

const Current = () => {
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
        ListHeaderComponent={<>{data.length > 0 && <SortBy />}</>}
        renderItem={({item}) => <RenderItems item={item} />}
        data={data}
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
