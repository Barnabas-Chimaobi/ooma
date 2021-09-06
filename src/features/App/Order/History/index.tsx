import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {SortBy, OrderCard} from '../components';
import {Total, EmptyList} from '../../../../components';
import shortid from 'shortid';
import S from './styles';
import {emptyCart} from '../../../../assets';
import {colors} from '../../../../colors';

const RenderItems = ({item}: any) => {
  // console.log(
  let ones = item?.data?.map((item) => item?.data?.map((item) => item));
  // console.log(ones, 'ones=======');
  //   'item',
  // );
  return (
    <View>
      <Text>{item?.deliveryTime}</Text>
      {item?.data?.map((item) =>
        item?.data?.map((item) => {
          // console.log(item, 'item===========');
          return (
            <OrderCard
              details={item}
              dateTitle={item?.deliveryTime}
              titlePosition="right"
              children={
                <>
                  <Total
                    randomTitle="ORDER ID"
                    randomValue={item?.itemData?.id}
                    mainStyle={S.totalStyle}
                  />
                  {item?.itemData?.menuitemorders?.MenuItemOrderDetails?.map(
                    (item, index) => (
                      <Total
                        randomTitle={`ITEM ${index + 1}`}
                        randomValue={item?.Cart?.quantity}
                        mainStyle={S.totalStyle}
                      />
                    ),
                  )}

                  <Total
                    total={Number(item?.itemData?.menuitemorders?.total)}
                    totalTitle="PRICE"
                    mainStyle={S.totalStyle}
                  />
                  <Total
                    randomTitle="STATUS"
                    randomValue={item?.itemData?.menuitemorders?.status}
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
        }),
      )}
    </View>
  );
};

const Current = ({item}) => {
  // console.log(item, 'consoleditemmm======');
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
