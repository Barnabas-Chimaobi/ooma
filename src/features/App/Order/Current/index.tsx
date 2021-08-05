import React from 'react';
import {View, FlatList} from 'react-native';
import {SortBy, OrderCard} from '../components';
import {Total, EmptyList} from '../../../../components';
import shortid from 'shortid';
import S from './styles';
import {emptyCart} from '../../../../assets';
import {useNavigation} from '@react-navigation/native';

const RenderItems = ({item}: any) => {
  const navigation = useNavigation();
  return (
    <OrderCard
      onPress={() => navigation.navigate('OrderDetails')}
      dateTitle="24/9/2021"
      titlePosition="left"
      children={
        <>
          <Total
            randomTitle="ORDER ID"
            randomValue={item.orderId}
            mainStyle={S.totalStyle}
          />
          <Total
            randomTitle="Scheduled Time"
            randomValue={item.time}
            mainStyle={S.totalStyle}
          />
          <Total
            randomTitle="Item(s)"
            randomValue={item.item}
            mainStyle={S.totalStyle}
          />
          <Total
            total={Number(item.price)}
            totalTitle="Total Price"
            mainStyle={S.totalStyle}
          />
        </>
      }
    />
  );
};

const Current = ({item}) => {
  const data = [
    {
      orderId: 'ZS214298',
      time: '1:00 PM',
      item: '4',
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
